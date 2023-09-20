const mongoose = require('mongoose');

// Create a schema for experiences
const experienceSchema = new mongoose.Schema({
    emp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", // Reference to the User collection
      },
  job_title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: Date,
  description: String,
  skills: [String]
});
const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
