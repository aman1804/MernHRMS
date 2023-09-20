const mongoose = require("mongoose");

// Define the schema for the attendance request approval
const attendanceRequestApprovalSchema = new mongoose.Schema(
  {
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee model, assuming you have a Employee  model for managers
      required: true,
    },
    emp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee model, assuming you have a Employee model for employees
      required: true,
    },
    attendance_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance", // Reference to the Attendance model if you have one
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    remark: {
      type: String,
      default:"",
    },
  },
  {
    timestamps: true,
  }
);

// Create the AttendanceRequestApproval model
const AttendanceRequestApproval = mongoose.model(
  "AttendanceRequestApproval",
  attendanceRequestApprovalSchema
);

module.exports = AttendanceRequestApproval;
