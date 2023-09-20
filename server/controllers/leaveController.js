const Employee = require("../model/employeeModel");
const { Leave, LeaveBalance } = require("../model/leaveModel");
const { updateLeaveBalance } = require("./leaveBalanceController");
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const moment = require('moment'); // Require moment.js for date comparisons

// Custom validation function for start date
exports.validateStartDate = (startDate) => {
    console.log(startDate)
  if (!moment(startDate).isSameOrAfter(moment(), 'day')) {
    throw new Error('Start date must be today or a future date');
  }
  return true;
};

// Custom validation function for end date
exports.validateEndDate = (endDate, startDate) => {
    console.log(startDate,endDate)

  if (!moment(endDate).isAfter(startDate, 'day')) {
    throw new Error('End date must be after the start date');
  }
  return true;
};



// Apply for leave
exports.applyLeave = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Validation checks using express-validator
      const errors = validationResult(req);
      console.error(errors)
      if (!errors.isEmpty()) {
        await session.abortTransaction();
        return res.status(400).json({ error: "validation failed" });
      }
  
      const { employeeId, startDate, endDate, reason, manager } = req.body;
  
      // Check if the employee has a leave balance
      const leaveBalance = await LeaveBalance.findOne({ employee: employeeId });
  
      if (!leaveBalance) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ error: "You do not have a leave balance. Please contact HR." });
      }
  
      const leave = new Leave({
        employee: employeeId,
        startDate,
        endDate,
        reason,
        manager,
      });
  
      await leave.save({ session });
  
      // Calculate the number of leave days between startDate and endDate
      const leaveDays = await calculateLeaveDays(leave.startDate, leave.endDate);
      console.log(leaveDays);
  
      // Check if there are enough leave days in the balance
      if (leaveBalance.annualLeaveBalance < leaveDays) {
        await session.abortTransaction();
        return res.status(400).json({ error: "Insufficient leave balance." });
      }
  
      // If everything is successful, commit the transaction
      await session.commitTransaction();
  
      return res
        .status(201)
        .json({ message: "Leave application submitted successfully." });
    } catch (error) {
      console.error(error);
      await session.abortTransaction(); // Rollback the transaction on error
      return res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    } finally {
      session.endSession(); // End the session
    }
  };

exports.getLeaveRequestsForEmployee = async (req, res) => {
  try {
    // Get the employee's ID from the request, you can pass it as a parameter or in the request body
    const { employeeId } = req.params; // Assuming you pass the employee's ID as a route parameter

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find leave requests for the employee using the employee's ID
    const leaveRequests = await Leave.find({ employee: employeeId // Leave requests where the employee's ID matches the manager's ID
    }).populate("employee");

    // Process leave requests to calculate deductions
    const leaveRequestsWithDeductions = leaveRequests.map((request) => {
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const timeDifference = endDate - startDate;
        const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))+1; // Calculate days

        return {
          ...request.toObject(),
          totalDeductions: days,
        };
      });

      const queryDate = new Date(); // Replace with the date you want to search for

      Leave.countDocuments({
        $or: [
          {
            startDate: { $lte: queryDate },
            endDate: { $gte: queryDate },
          },
          {
            startDate: queryDate,
          },
          {
            endDate: queryDate,
          },
        ],
      })
        .then((count) => {
          console.log(`Count: ${count}`);
        })
        .catch((err) => {
          console.error(err);
        });
    const leaveRequestData = leaveRequestsWithDeductions.reverse().map((leaveRequest) => ({
      id: leaveRequest._id,
      emp_name: leaveRequest.employee.first_name + " " + leaveRequest.employee.last_name, // Access the populated employee's name
      emp_designation: leaveRequest.employee.designation,
      request_date: leaveRequest.createdAt,
      startDate:leaveRequest.startDate,
      endDate:leaveRequest.endDate,
      status: leaveRequest.status,
      days:leaveRequest.totalDeductions,
    }));
    
    res.status(200).json(leaveRequestData);
    //   res.status(200).json({ leaveRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLeaveRequestsForManager = async (req, res) => {
    try {
      // Get the employee's ID from the request, you can pass it as a parameter or in the request body
      const { employeeId } = req.params; // Assuming you pass the employee's ID as a route parameter
  
      // Find the employee by ID
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Find leave requests for the employee using the employee's ID
      const leaveRequests = await Leave.find({ manager: employeeId // Leave requests where the employee's ID matches the manager's ID
      }).populate("employee");
  
      // Process leave requests to calculate deductions
      const leaveRequestsWithDeductions = leaveRequests.map((request) => {
          const startDate = new Date(request.startDate);
          const endDate = new Date(request.endDate);
          const timeDifference = endDate - startDate;
          const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))+1; // Calculate days
  
          return {
            ...request.toObject(),
            totalDeductions: days,
          };
        });
      const leaveRequestData = leaveRequestsWithDeductions.reverse().map((leaveRequest) => ({
        id: leaveRequest._id, 
        emp_name: leaveRequest.employee.first_name + " " + leaveRequest.employee.last_name, // Access the populated employee's name
        emp_designation: leaveRequest.employee.designation,
        request_date: leaveRequest.createdAt,
        startDate:leaveRequest.startDate,
        endDate:leaveRequest.endDate,
        status: leaveRequest.status,
        days:leaveRequest.totalDeductions,
      }));
      
      res.status(200).json(leaveRequestData);
      //   res.status(200).json({ leaveRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };




exports.getLeaveRequestDetails = async (req, res) => {
    try {
      // Get the leave request ID from the request parameters
      const { leaveRequestId } = req.params;
  
      // Find the leave request by its ID
      const leaveRequest = await Leave.findById(leaveRequestId)
        .populate('employee') // Populate employee's name
        .populate('manager'); // Populate manager's name
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      // Calculate the number of leave days
      const startDate = leaveRequest.startDate;
      const endDate = leaveRequest.endDate;
      const timeDifference = endDate.getTime() - startDate.getTime()+1;
      const leaveDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
      // Fetch the corresponding leave balance
      const leaveBalance = await LeaveBalance.findOne({
        employee: leaveRequest.employee,
      });
  
      if (!leaveBalance) {
        return res.status(404).json({ message: 'Leave balance not found' });
      }
  
      // Calculate the deduction from casual leave (up to the balance)
      const casualLeaveBalance = leaveBalance.casualLeaveBalance;
      const casualLeaveDeduction = Math.min(casualLeaveBalance, leaveDays);
      const remainingCasualLeaveBalance = casualLeaveBalance - casualLeaveDeduction;
  
      // Calculate the deduction from annual leave (if needed)
      const annualLeaveBalance = leaveBalance.annualLeaveBalance;
      const annualLeaveDeduction =
        leaveDays - casualLeaveDeduction > 0
          ? Math.min(annualLeaveBalance, leaveDays - casualLeaveDeduction)
          : 0;
      const remainingAnnualLeaveBalance = annualLeaveBalance - annualLeaveDeduction;
  
      // Prepare the response object
      const response = {
        leaveRequest: {
          id: leaveRequest._id,
          employee: leaveRequest.employee.first_name+" "+leaveRequest.employee.last_name,
          manager: leaveRequest.manager ? leaveRequest.manager.first_name+" "+leaveRequest.manager.last_name : null,
          startDate: leaveRequest.startDate.toLocaleDateString(),
          endDate: leaveRequest.endDate.toLocaleDateString(),
          reason: leaveRequest.reason,
          status: leaveRequest.status,
          remark: leaveRequest.remark,
          request_date:leaveRequest.createdAt.toLocaleDateString(),
          days:calculateLeaveDays(leaveRequest.endDate,leaveRequest.startDate)
        },
        deductions: {
          casualLeave: casualLeaveDeduction,
          annualLeave: annualLeaveDeduction,
        },
        remainingLeaveBalance: {
          casualLeave: remainingCasualLeaveBalance,
          annualLeave: remainingAnnualLeaveBalance,
        },
      };
  
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
// Approve or reject leave
exports.approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ error: "Leave not found." });
    }

    // Check if the leave has already been processed
    if (leave.status !== "Pending") {
      return res
        .status(400)
        .json({ error: "Leave has already been processed." });
    }

    // Update leave status
    leave.status = status;
    await leave.save();

    // If leave is approved, deduct leave days from the balance
    if (status === "Approved") {
      const { employee, startDate, endDate } = leave;
      const leaveType = "annualLeaveBalance"; // Adjust this according to your leave types

      // Calculate the number of leave days between startDate and endDate
      const leaveDays = calculateLeaveDays(startDate, endDate);

      // Update leave balance
      const leaveBalanceUpdated = await updateLeaveBalance(employee, leaveDays);

      if (!leaveBalanceUpdated) {
        return res.status(500).json({ error: "Error updating leave balance." });
      }
    }

    return res.json({ message: `Leave ${status} updated successfully.`});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

// Function to calculate leave days between two dates (you can use a library like moment.js for better date manipulation)
function calculateLeaveDays(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  return Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
}


