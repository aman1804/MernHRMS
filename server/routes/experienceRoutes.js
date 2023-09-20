const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

// Create a new experience
router.post('/create', experienceController.createExperience);

// Get all experiences
router.get('/employee/:emp_id', experienceController.getAllExperiences);

// Get a single experience by ID
router.get('/get/:id', experienceController.getExperienceById);

// Update an experience by ID
router.put('/update/:id', experienceController.updateExperience);

// Delete an experience by ID
router.delete('/delete/:id', experienceController.deleteExperience);

module.exports = router;
