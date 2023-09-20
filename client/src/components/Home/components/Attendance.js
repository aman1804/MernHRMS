import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttendanceTimes,
  markAttendance,
} from "../../../actions/attendanceAction";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Attendance = ({ emp_id }) => {
  const dispatch = useDispatch();
  const { start_time, end_time, loading, error } = useSelector(
    (state) => state.attendance
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getAttendanceTimes(emp_id));
  }, [dispatch,emp_id]);

  const handleAttendance = (tol) => {
    dispatch(markAttendance(emp_id, tol)); // Use the single dispatcher for both start and end
  };

  return (
    <Grid item xs={12} sm={6} md={4} justifyContent="center">
      <Card variant="outlined">
        <CardHeader
          sx={{ backgroundColor: "primary.main", color: "white", p: 1 }}
          title="Attendance"   action={<MoreVertIcon onClick={handleOpen} />}
        />
        <CardContent>
          <Stack direction="row" spacing={5} justifyContent="space-around">
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => handleAttendance("start")}
              disabled={start_time}
            >
              {loading ? (
                <CircularProgress size={24} disableShrink />
              ) : start_time ? (
                `Started: ${start_time}`
              ) : (
                "Start"
              )}
            </Button>
            {start_time && <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => handleAttendance("end")}
              disabled={end_time}
            >
              {loading ? (
                <CircularProgress size={24} disableShrink />
              ) : end_time ? (
                `Ended: ${end_time}`
              ) : (
                "End"
              )}
            </Button>}
          </Stack>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Attendance;
