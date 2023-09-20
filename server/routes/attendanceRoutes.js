// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const {createAttendanceRequestApproval,updateAttendanceRequestApprovalStatus,getAllAttendanceRequestApprovals} = require('../controllers/attendanceRequestApprovalController');

// Route to mark attendance
router.post('/mark', attendanceController.markAttendance);

router.get('/get-attendance-times/:emp_id', attendanceController.getAttendanceTimesForEmployee);

router.get('/get-present-dates/:emp_id', attendanceController.findPresentDatesForEmployee);


router.post('/previous', attendanceController.getEmployeeAttendance);

router.post('/request', createAttendanceRequestApproval);
router.get('/request/get/:emp_id', getAllAttendanceRequestApprovals);
router.get(
    "/calculate-attendance/:emp_id/:year/:month",
    attendanceController.calculateAttendance
  );

// Route to regularize attendance
router.put('/regularize', attendanceController.regularizeAttendance);
router.put('/request-approval/:id', updateAttendanceRequestApprovalStatus);

module.exports = router;
