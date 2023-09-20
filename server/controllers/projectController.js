const Project = require("../model/projectModel");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a list of all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectData = req.body;
    const project = await Project.findByIdAndUpdate(projectId, projectData, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndRemove(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getProjectByEmpId =  async (req, res) => {
    try {
      const employeeId = req.params.employeeId;
  
      // Find projects where the employee is a team member or the manager
      const projects = await Project.find({
        $or: [
          { manager: employeeId },
          { teamMembers: { $in: [employeeId] } },
        ],
      });
  
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };


  exports.getProjectDetails = async (req, res) => {
    try {
      // Get the project ID from the request parameters
      const projectId = req.params.projectId;
  
      // Find the project by ID in the database
      const project = await Project.findById(projectId)
        .populate("teamMembers") // Populate the teamMembers field with employee details
        .populate("manager"); // Populate the manager field with employee details
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      // Format dates to "yyyy-mm-dd" format
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
  
      const formattedProject = {
        ...project._doc,
        startDate: formatDate(project.startDate),
        endDate: project.endDate ? formatDate(project.endDate) : "",
      };
  
      // Concatenate employee and manager names
      const employeeFullName = (employee) =>
        `${employee.first_name} ${employee.last_name}`;
  
      formattedProject.managerName = employeeFullName(project.manager);
      formattedProject.teamMembersNames = project.teamMembers.map(
        employeeFullName
      );
  
      // Send the formatted project details as a response
      res.status(200).json(formattedProject);
    } catch (error) {
      console.error("Error fetching project details:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  