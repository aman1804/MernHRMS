const Attendance = require("../model/attendanceModel"); // Import your Attendance model
const { createAttendanceRequestApproval } = require('./attendanceRequestApprovalController');


exports.markAttendance = async (req, res) => {
  try {
    const { emp_id, tol } = req.body;
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in "YYYY-MM-DD" format
    const existingStartAttendance = await Attendance.findOne({
      emp_id,
      date: currentDate,
      start_time: { $exists: true },
    });

    if (tol === "start") {
      // Check if start attendance for the given emp_id and current date already exists
      if (existingStartAttendance) {
        return res
          .status(400)
          .json({ error: "Start attendance already marked for today" });
      }

      const attendance = new Attendance({
        emp_id,
        date: currentDate,
        start_time: new Date().toLocaleTimeString().toLocaleUpperCase(),
        end_time: null,
      });
      await attendance.save();
      res
        .status(201)
        .json({ start_time: attendance.start_time, end_time: null });
    } else if (tol === "end") {
      const existingEndAttendance = await Attendance.findOne({
        emp_id,
        date: currentDate,
        is_present: true,
      });

      if (existingEndAttendance) {
        return res
          .status(400)
          .json({ error: "End attendance already marked for today" });
      }

      if (!existingStartAttendance) {
        return res
          .status(400)
          .json({ error: "No start attendance found for today" });
      }

      existingStartAttendance.end_time = new Date().toLocaleTimeString().toUpperCase();
      existingStartAttendance.is_present = true;

      const updatedAttendance = await existingStartAttendance.save();
      if (updatedAttendance) {
        res
          .status(201)
          .json({
            start_time: updatedAttendance.start_time,
            end_time: updatedAttendance.end_time,
          });
      }
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};

exports.getAttendanceTimesForEmployee = async (req, res) => {
  try {
    const emp_id = req.params.emp_id; // Assuming emp_id is passed in the request body
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in "YYYY-MM-DD" format
    const attendance = await Attendance.findOne({ emp_id, date: currentDate });

    if (!attendance) {
      return res
        .status(404)
        .json({ error: "Attendance not found for the current date" });
    }

    const { start_time, end_time } = attendance;
    res.status(200).json({ start_time, end_time });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to retrieve attendance times" });
  }
};



// Controller to regularize attendance for an employee
exports.regularizeAttendance = async (req, res) => {
  try {
    const { emp_id, date } = req.body; // Get employee ID and date from the request body
    const existingAttendance = await Attendance.findOne({ emp_id, date });

    if (existingAttendance) {
      // If attendance record exists, update start_time and end_time
      existingAttendance.start_time = req.body.start_time;
      existingAttendance.end_time = req.body.end_time;
      existingAttendance.is_present = true;
      existingAttendance.is_regularized = true;
      await existingAttendance.save();
      res.status(200).json({ message: "Attendance updated successfully" });
    } else {
      // If attendance record doesn't exist, create a new one
      const newAttendance = new Attendance({
        emp_id,
        date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        is_present: true,
        is_regularized: true,
      });
      await newAttendance.save();
      res.status(201).json({ message: "New attendance record created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update/insert attendance" });
  }
};






exports.findPresentDatesForEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;

    const presentDates = await Attendance.find({
      emp_id: emp_id,
      is_present: true,
    }).select("date");

    return res.status(200).json({
      presentDates: presentDates.map((date) => date.date),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get employee's start time and end time for a given date
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const { emp_id, date } = req.body;
    console.log("call");
    if (!emp_id || !date) {
      return res
        .status(400)
        .json({
          error: "emp_id and date are required in the query parameters",
        });
    }

    const attendance = await Attendance.findOne({ emp_id, date });

    if (!attendance) {
      return res.status(200).json({ start_time: "", end_time: "" });
    }

    const { start_time, end_time } = attendance;

    res.json({ start_time, end_time });
  } catch (error) {
    console.error("Error fetching employee's attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.calculateAttendance = async (req, res) => {
  try {
    const { emp_id, year, month } = req.params;

    // Calculate the start and end date for the given month
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed
    const endDate = new Date(year, month, 0);

    // Query the database for attendance records in the specified month
    const attendanceRecords = await Attendance.find({
      emp_id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Initialize counters
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalRegularized = 0;

    // Calculate statistics based on the records
    attendanceRecords.forEach((record) => {
      if (record.is_present) {
        totalPresent++;
      } else if (record.is_regularized) {
        totalRegularized++;
      } else {
        totalAbsent++;
      }
    });

    // Return the calculated statistics as JSON
    res.json({
      totalPresent,
      totalAbsent,
      totalRegularized,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};