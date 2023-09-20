import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveLeave,
  fetchLeaveRequestDetails,
} from "../../actions/leaveAction";
import {
    Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

const LeaveDetails = ({ leaveRequestId }) => {
  const {
    leaveRequestDetailsloading,
    error,
    leaveRequestDetails,
    approveLeaveLoading,
    approveLeaveError,
    approveLeaveMessage,
  } = useSelector((state) => state.leave);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    // Fetch leave details using the leaveRequestId
    dispatch(fetchLeaveRequestDetails(leaveRequestId));
  }, [dispatch, leaveRequestId,approveLeaveMessage]);

  if (leaveRequestDetailsloading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  if (!leaveRequestDetails) {
    return <Typography variant="h6">Leave request not found</Typography>;
  }

  const handleCancelClick = (status) => {
    try{

        dispatch(approveLeave(leaveRequestId, status));
    }
    catch(error){
        console.log(error)
    }
    setState({ ...state, open: true });
  };
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
        {approveLeaveMessage &&<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {approveLeaveMessage.message}
          </Alert>
        </Snackbar>}


        {approveLeaveError &&<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {approveLeaveError.error}
          </Alert>
        </Snackbar>}
        
      <Box>
        {leaveRequestDetails && (
          <Grid container spacing={3}>
            {leaveRequestDetails.leaveRequest.status == "Pending" && (
              <>
                <Grid item xs={6}>
                  <Chip
                    label={leaveRequestDetails.leaveRequest.status}
                    sx={{ mx: 2 }}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleCancelClick("Cancelled")}
                    disabled={approveLeaveLoading}
                  >
                    {approveLeaveLoading ? <CircularProgress /> : "Cancel"}
                  </Button>
                </Grid>
              </>
            )}
            {leaveRequestDetails.leaveRequest.status == "Approved" && (
              <Grid item xs={12}>
                <Chip
                  label={leaveRequestDetails.leaveRequest.status}
                  sx={{ mx: 2 }}
                  color="success"
                />
              </Grid>
            )}

            {leaveRequestDetails.leaveRequest.status == "Rejected" && (
              <Grid item xs={12}>
                <Chip
                  label={leaveRequestDetails.leaveRequest.status}
                  sx={{ mx: 2 }}
                  color="error"
                />
              </Grid>
            )}

            {leaveRequestDetails.leaveRequest.status == "Cancelled" && (
              <Grid item xs={12}>
                <Chip
                  label={leaveRequestDetails.leaveRequest.status}
                  sx={{ mx: 2 }}
                  color="warning"
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Leave Request Details
              </Typography>
              <Typography variant="body1">
                <strong>Requested Date:</strong>{" "}
                {leaveRequestDetails.leaveRequest.request_date}
              </Typography>

              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {leaveRequestDetails.leaveRequest.startDate}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {leaveRequestDetails.leaveRequest.endDate}
              </Typography>
              <Typography variant="body1">
                <strong>Total Days:</strong>{" "}
                {leaveRequestDetails.leaveRequest.days}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Manager:</strong>{" "}
                {leaveRequestDetails.leaveRequest.manager}
              </Typography>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Leave Deductions
                </Typography>
                <Typography variant="body1">
                  <strong>Casual Leave Deductions:</strong>{" "}
                  {leaveRequestDetails.deductions.casualLeave}
                </Typography>
                <Typography variant="body1">
                  <strong>Annual Leave Deductions:</strong>{" "}
                  {leaveRequestDetails.deductions.annualLeave}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default LeaveDetails;
