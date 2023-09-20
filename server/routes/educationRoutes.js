const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

// Get all education records
router.get('/get/:emp_id', educationController.getAllEducation);

// Create a new education record
router.post('/create', educationController.createEducation);

// Update an education record
router.put('/update/:id', educationController.updateEducation);

// Delete an education record
router.delete('/delete/:id', educationController.deleteEducation);

module.exports = router;
