const Experience = require('../model/experienceModel'); // Update the path accordingly

// Controller for handling CRUD operations on experiences
const experienceController = {
  // Create a new experience
  createExperience: async (req, res) => {
    try {
      const newExperience = new Experience(req.body);
      const savedExperience = await newExperience.save();
      res.status(201).json(savedExperience);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'An error occurred while creating the experience.' });
    }
  },

  // Get all experiences
  getAllExperiences: async (req, res) => {
    const emp_id=req.params.emp_id
    try {
      const experiences = await Experience.find({emp_id});
      res.json(experiences);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'An error occurred while retrieving experiences.' });
    }
  },

  // Get a single experience by ID
  getExperienceById: async (req, res) => {
    try {
      const experience = await Experience.findById(req.params.id);
      if (!experience) {
        return res.status(404).json({ error: 'Experience not found.' });
      }
      res.json(experience);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the experience.' });
    }
  },

  // Update an experience by ID
  updateExperience: async (req, res) => {
    try {
      const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!experience) {
        return res.status(404).json({ error: 'Experience not found.' });
      }
      res.json(experience);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the experience.' });
    }
  },

  // Delete an experience by ID
  deleteExperience: async (req, res) => {
    try {
      const experience = await Experience.findByIdAndDelete(req.params.id);
      if (!experience) {
        return res.status(404).json({ error: 'Experience not found.' });
      }
      res.json({ message: 'Experience deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the experience.' });
    }
  },
};

module.exports = experienceController;
