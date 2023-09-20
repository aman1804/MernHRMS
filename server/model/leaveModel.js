const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected","Cancelled"],
      default: "Pending",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    remark: String,
  },
  {
    timestamps: true,
  }
);

const leaveBalanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  annualLeaveBalance: Number,
  casualLeaveBalance: Number,
});

const Leave = mongoose.model("Leave", leaveSchema);
const LeaveBalance = mongoose.model("LeaveBalance", leaveBalanceSchema);




module.exports = { Leave, LeaveBalance };
