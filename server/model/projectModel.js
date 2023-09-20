const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee collection
    },
  ],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the Employee collection
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "On Hold"],
    default: "Not Started",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
 
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
