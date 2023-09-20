const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const Project = require("../model/projectModel");

// Create a new project
router.post("/create", projectController.createProject);

// Get a list of all projects
router.get("/get", projectController.getAllProjects);

router.get("/single/:projectId", projectController.getProjectDetails);

// Define a route to get projects for an employee by their employee ID
router.get("/projects/get/:employeeId",projectController.getProjectByEmpId);
// Get a single project by ID
router.get("/get/:id", projectController.getProjectById);

// Update a project by ID
router.put("/update/:id", projectController.updateProject);

// Delete a project by ID
router.delete("/delete/:id", projectController.deleteProject);

module.exports = router;
