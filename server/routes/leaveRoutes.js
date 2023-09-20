const express = require('express');
const { approveLeave, applyLeave, getLeaveRequestsForEmployee, getLeaveRequestDetails, validateStartDate, validateEndDate, getLeaveRequestsForManager } = require('../controllers/leaveController');
const { createLeaveBalance } = require('../controllers/leaveBalanceController');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const moment = require('moment'); // Require moment.js for date comparisons
// Apply for leave route with custom input validations
router.post(
    '/apply',
    [
      body('employeeId').isString(),
      body('startDate').custom(validateStartDate),
      body('endDate').custom((endDate, { req }) => validateEndDate(endDate, req.body.startDate)),
      body('reason').isString(),
      body('manager').isString(),
    ],
    applyLeave
  );
  

// Manager approves/rejects leave
router.put('/approve/:leaveId',approveLeave);
router.get('/requests/:employeeId',getLeaveRequestsForEmployee);
router.get('/requests/manager/:employeeId',getLeaveRequestsForManager);
router.get('/requests/details/:leaveRequestId',getLeaveRequestDetails);


//Create leave balances
router.post('/balance/create/',createLeaveBalance)
// Get leave balances
router.get('/balance/:employeeId', async (req, res) => {
  // Retrieve leave balances for the employee
});

module.exports = router;
