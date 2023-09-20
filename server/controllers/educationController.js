const Education = require('../model/educationModel');

// Controller to get all education records
exports.getAllEducation = async (req, res) => {
    const emp_id = req.params.emp_id
  try {
    const educations = await Education.find({emp_id});
    res.json(educations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to create a new education record
exports.createEducation = async (req, res) => {
  const education = new Education(req.body);
  try {
    const newEducation = await education.save();
    res.status(201).json(newEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to update an education record
exports.updateEducation = async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to delete an education record
exports.deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndRemove(req.params.id);
    res.json({ message: 'Education record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
