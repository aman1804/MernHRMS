const AttendanceRequestApproval = require("../model/attendanceRequestApprovalModel");
const Attendance = require("../model/attendanceModel"); // Import your Attendance model


function formatTimeToAMPM(dateString) {
    const inputDate = new Date(dateString);
    const formattedTime = inputDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }


// Create a new attendance request approval
exports.createAttendanceRequestApproval = async (req, res) => {
  try {
    const { manager_id, emp_id, date, start_time, end_time } = req.body;
    const formattedStartTime = formatTimeToAMPM(start_time);
    const formattedEndTime = formatTimeToAMPM(end_time);

    console.log(req.body);

    var attendance_id;
    const existingAttendance = await Attendance.findOne({ emp_id, date });
console.log(start_time,end_time)
    if (existingAttendance) {
      // If attendance record exists, update start_time and end_time
      existingAttendance.start_time = formattedStartTime;
      existingAttendance.end_time = formattedEndTime;
      // existingAttendance.is_present = true;
      existingAttendance.is_regularized = true;
      await existingAttendance.save();
      attendance_id = existingAttendance._id;
      // res.status(200).json({ message: "Attendance updated successfully" });
    } else {
      // If attendance record doesn't exist, create a new one
      const newAttendance = new Attendance({
        emp_id,
        date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        //   is_present: true,
        is_regularized: true,
      });
      await newAttendance.save();
      attendance_id = newAttendance._id;
      // res.status(201).json({ message: "New attendance record created" });
    }
    // Create a new attendance request approval instance
    const attendanceRequestApproval = new AttendanceRequestApproval({
      manager_id,
      emp_id,
      attendance_id,
    });

    // Save the attendance request approval to the database
    await attendanceRequestApproval.save();

    res
      .status(201)
      .json({ message: "Attendance Changes request send to your manager" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a list of all attendance request approvals
exports.getAllAttendanceRequestApprovals = async (req, res) => {
  const { emp_id } = req.params;

  try {
    const attendanceRequestApprovals = await AttendanceRequestApproval.find({
      manager_id: emp_id,
    })
      .populate("emp_id") // Replace 'name' and 'email' with fields you want to populate
      .populate("attendance_id"); // No specific fields to select here
    const approvalsData = attendanceRequestApprovals.map((approval) => ({
      id: approval._id,
      emp_name: approval.emp_id.first_name + " " + approval.emp_id.last_name, // Access the populated employee's name
      emp_designation: approval.emp_id.designation,
      request_date: approval.createdAt.toLocaleDateString(),
      status: approval.status,
      remark: approval.remark,
      attendance_id: approval.attendance_id, // Access the populated employee's email
    }));

    res.status(200).json(approvalsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single attendance request approval by ID
exports.getAttendanceRequestApprovalById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendanceRequestApproval = await AttendanceRequestApproval.findById(
      id
    );
    if (!attendanceRequestApproval) {
      return res
        .status(404)
        .json({ error: "Attendance request approval not found" });
    }
    res.status(200).json(attendanceRequestApproval);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the status of an attendance request approval by ID
exports.updateAttendanceRequestApprovalStatus = async (req, res) => {
  const { id } = req.params;
  const { status, remark } = req.body;

  try {
    const attendanceRequestApproval =
      await AttendanceRequestApproval.findByIdAndUpdate(
        id,
        { status, remark },
        { new: true }
      );

    if (!attendanceRequestApproval) {
      return res
        .status(404)
        .json({ error: "Attendance request approval not found" });
    } else if(status=="approved") {
      const attendance_id = attendanceRequestApproval.attendance_id;
      const updateAttendance = await Attendance.findByIdAndUpdate(
        attendance_id,
        { is_present: true }
      );

      if (!updateAttendance) {
        return res.status(404).json({ error: "Attendance not found" });
      }
    }
    res.status(200).json({ message: `request ${status} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
