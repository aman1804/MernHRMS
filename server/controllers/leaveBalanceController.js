const {LeaveBalance} = require('../model/leaveModel');
const Employee = require('../model/employeeModel'); // Assuming you have an Employee model

// Create leave balance for an employee
exports.createLeaveBalance = async (req, res) => {
  try {
    const { employeeId, annualLeaveBalance, casualLeaveBalance } = req.body;

    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    // Check if the employee already has a leave balance
    const existingLeaveBalance = await LeaveBalance.findOne({ employee: employeeId });
    if (existingLeaveBalance) {
      return res.status(400).json({ error: 'Leave balance already exists for this employee.' });
    }

    // Create a new leave balance record
    const leaveBalance = new LeaveBalance({
      employee: employeeId,
      annualLeaveBalance,
      casualLeaveBalance,
    });

    await leaveBalance.save();

    return res.status(201).json({ message: 'Leave balance created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};


// Update leave balance after leave approval
// exports.updateLeaveBalance = async (employeeId, leaveType, daysUsed) => {
//   try {
//     const leaveBalance = await LeaveBalance.findOne({ employee: employeeId });

//     if (!leaveBalance) {
//       return false; // Handle leave balance not found
//     }

//     // Update the appropriate leave balance field (e.g., annualLeaveBalance)
//     leaveBalance[leaveType] -= daysUsed;

//     await leaveBalance.save();
//     return true; // Leave balance updated successfully
//   } catch (error) {
//     console.error(error);
//     return false; // Handle error while updating leave balance
//   }
// };



exports.updateLeaveBalance = async (employeeId, leaveDays) => {
    try {
      const leaveBalance = await LeaveBalance.findOne({ employee: employeeId });
  
      if (!leaveBalance) {
        return false; // Handle leave balance not found
      }
  
      if (leaveBalance.casualLeaveBalance >= leaveDays) {
        // Deduct from casualLeaveBalance if there are enough casual leave days
        leaveBalance.casualLeaveBalance -= leaveDays;
      } else {
        // Calculate the remaining casual leave days
        const remainingCasualLeave = leaveBalance.casualLeaveBalance;
        leaveBalance.casualLeaveBalance = 0;
  
        // Calculate the remaining days to be deducted from annualLeaveBalance
        const remainingDaysToDeduct = leaveDays - remainingCasualLeave;
  
        // Check if there are enough annual leave days
        if (leaveBalance.annualLeaveBalance < remainingDaysToDeduct) {
          return false; // Insufficient annual leave balance
        }
  
        // Deduct the remaining days from annualLeaveBalance
        leaveBalance.annualLeaveBalance -= remainingDaysToDeduct;
      }
  
      await leaveBalance.save();
      return true; // Leave balance updated successfully
    } catch (error) {
      console.error(error);
      return false; // Handle error while updating leave balance
    }
  };