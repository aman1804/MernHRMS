const Employee = require('../model/employeeModel');
const Experience = require('../model/experienceModel');
const Education = require('../model/educationModel');
const Address = require('../model/addressModel');

// Define a controller function to get all data related to an employee by their emp_id
const getAllDataForEmployee = async (req, res) => {
  const emp_id = req.params.emp_id; // Assuming the emp_id is provided as a URL parameter

  try {
    // Find the employee by emp_id
    const employee = await Employee.findById(emp_id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Find experiences related to the employee
    const experiences = await Experience.find({ emp_id });

    // Find education records related to the employee
    const education = await Education.find({ emp_id });

    // Find addresses related to the employee
    const addresses = await Address.find({ emp_id });

    // Return the employee and related data as a JSON response
    res.status(200).json({ employee, experiences, education, addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllDataForEmployee,
};
