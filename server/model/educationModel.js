const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the User collection
  },
  qualification: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  passing_year: {
    type: Number,
    required: true,
  },
});
const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
