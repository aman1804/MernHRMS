const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const Employee = require("../model/employeeModel.js");
const { sendConfirmationEmail } = require("../mailer/mailer.js");
const generateToken = require("../utils/generateToken");

const mongoose = require("mongoose");

const registerUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    blood_group,
    gender,
    designation,
    dob,
    marital_status,
    email,
    password,
  } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userExits = await User.findOne({ email });

    if (userExits) {
      throw new Error("User Already exists");
    }

    const employee = await Employee.create(
      [
        {
          first_name,
          last_name,
          designation,
          gender,
          blood_group,
          dob,
          marital_status,
        },
      ],
      { session }
    );

    if (employee) {
      const user = await User.create(
        [
          {
            email,
            password,
            emp_id: employee[0]._id,
          },
        ],
        { session }
      );

      if (user) {
        console.log(user[0]);

        // Sending confirmation email
        const confirmEmail = await sendConfirmationEmail(user[0]); // Provide the recipient email here
        console.log(confirmEmail);
        if (confirmEmail) {
          await session.commitTransaction();
          const token = generateToken(user[0]._id);

          res.status(201).json({
            message: "Registration successful",
            user_id: user[0]._id,
            emp_id: employee[0]._id,
            first_name: employee[0].first_name,
            last_name: employee[0].last_name,
            email: user[0].email,
            token: token,
          });
        } else {
          console.log("email not sent");
          res.status(400);
          throw new Error("Error occurred while sending email");
        }

        // Rest of the response and email sending logic
      } else {
        await session.abortTransaction();
        res.status(400);
        throw new Error("Error occurred while creating employee");
      }
    } else {
      await session.abortTransaction();
      res.status(400);
      throw new Error("Error occurred while creating user");
    }
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    // Query the database to retrieve users with isVerified set to true
    const users = await User.find({
      isVerified: true,
      isActive: true,
    }).populate("emp_id"); // Populate the 'emp_id' field with the employee's email

    // Filter the result to include only the necessary fields
    const filteredUsers = users.map((user) => ({
      id: user.emp_id._id,
      email: user.email,
      emp_name: user.emp_id.first_name + " " + user.emp_id.last_name,
      emp_designation: user.emp_id.designation,
      isAdmin: user.isAdmin,
    }));

    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const userEmail = req.params.email;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const employee = await Employee.findOne({ user_id: user._id }).populate(
    "user_id"
  );

  if (employee) {
    const token = await user.generatePasswordResetToken();
    console.log(token);
    res.status(200).json({
      _id: employee._id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      designation: employee.designation,
      blood_group: employee.blood_group,
      gender: employee.gender,
      marital_status: employee.marital_status,
      // ... other employee fields
      user: employee.user_id, // Populated user details
    });
  } else {
    res.status(404);
    throw new Error("Employee not found for the given user");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    const isVerified = user.isVerified;
    console.log("savenotdone");

    if (!isVerified) {
      user.isVerified = true; // Update the isVerified field
      const verifiedUser = await user.save(); // Save the updated user
      console.log("User verified and updated:", verifiedUser);
    }

    res.redirect("http://localhost:3000/");
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    dob,
    bloodGroup,
    maritalStatus,
    user_id,
    emp_id,
  } = req.body;

  const employee = await Employee.findOne({ _id: emp_id }); // Use the correct field name
  const user = await User.findOne({ _id: user_id });

  if (employee && user) {
    employee.first_name = firstName || employee.first_name;
    employee.last_name = lastName || employee.last_name;
    employee.gender = gender || employee.gender;
    employee.dob = dob || employee.dob;
    employee.blood_group = bloodGroup || employee.blood_group;
    employee.marital_status = maritalStatus || employee.marital_status;

    const updatedEmployee = await employee.save();

    if (updatedEmployee) {
      res.json({
        user_id: user._id,
        emp_id: updatedEmployee._id,
        first_name: updatedEmployee.first_name,
        last_name: updatedEmployee.last_name,
        designation: updatedEmployee.designation,
        gender: updatedEmployee.gender,
        dob: updatedEmployee.dob,
        blood_group: updatedEmployee.blood_group,
        marital_status: updatedEmployee.marital_status,
        manager_id: employee.manager_id,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      });
    }
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getEmployeeUnderManager = asyncHandler(async (req, res) => {
  const { manager_id } = req.params;
  try {
    const userData = await User.aggregate([
      {
        $lookup: {
          from: "employees", // The name of the Employee collection in your database
          localField: "emp_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $unwind: "$employee",
      },
      {
        $match: {
          "employee.manager_id": new mongoose.Types.ObjectId(manager_id),
        },
      },
      {
        $project: {
          _id: 0,
          empName: {
            $concat: ["$employee.first_name", " ", "$employee.last_name"],
          },
          empId: "$employee._id",
          userEmail: "$email",
        },
      },
    ]);
    console.log("call", userData);
    res.status(201).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  registerUser,
  getUsers,
  getUser,
  verifyUser,
  updateUserProfile,
  getEmployeeUnderManager,
};
