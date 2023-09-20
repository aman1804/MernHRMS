import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLeave } from "../../actions/leaveAction";

const ApplyLeave = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    manager: "",
    employeeId: ",",
  });
  

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { applyLeaveLoading, applyLeaveError, applyLeaveMessage ,success} = useSelector(
    (state) => state.leave
  );
  useEffect(() => {
    if (userInfo) {
      setLeaveData({
        ...leaveData,
        manager: userInfo.manager_id,
        employeeId: userInfo.emp_id,
      });
    }
  }, [userInfo]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    try{

     dispatch(applyLeave(leaveData));

    }
    catch(error){
        console.log(error)
    }
    setState({
        open: true,
        vertical: "top",
        horizontal: "center",
      })
  };

  console.log(applyLeaveError)
  return (
    <Paper sx={{ padding: 2, position: "relative" }}>
      
        {applyLeaveMessage &&<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {applyLeaveMessage}
          </Alert>
        </Snackbar>}


        {applyLeaveError &&<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {applyLeaveError.error}
          </Alert>
        </Snackbar>}
        
      {applyLeaveLoading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={50} disableShrink />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Start Date"
              type="date"
              name="startDate"
              value={leaveData.startDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="End Date"
              type="date"
              name="endDate"
              value={leaveData.endDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Reason"
              multiline
              rows={4}
              name="reason"
              value={leaveData.reason}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Apply Leave
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ApplyLeave;
