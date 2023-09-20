const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    emp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee collection
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
    is_present: {
      type: Boolean,
      default: false,
    },
    is_regularized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
