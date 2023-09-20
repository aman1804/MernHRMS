import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAttendanceRequest, resetSuccess } from "../../actions/attendancerequestApprovalAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Regularize_Modal({
  selectedDate,
  start_time,
  end_time,
  emp_id,
  manager_id,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [date, setDate] = useState(selectedDate);
  const [startTimeDate, setStartTimeDate] = useState();
  const [endTimeDate, setEndTimeDate] = useState();

  useEffect(() => {
    setStartTimeDate(dayjs(start_time, "h:mm:ss a").toDate());
    setEndTimeDate(dayjs(end_time, "h:mm:ss a").toDate());
  }, [start_time, end_time]);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.attendanceRequestApproval
  );

  const handleClose = () => {
    setOpen(false);
    dispatch(resetSuccess())
  };
  const handleClick = () => {
    dispatch(
      createAttendanceRequest(
        manager_id,
        emp_id,
        date,
        startTimeDate,
        endTimeDate
      )
    );
    console.log({
      manager_id: manager_id,
      emp_id: emp_id,
      date: date,
      start_time: startTimeDate,
      end_time: endTimeDate,
    });
  };
  console.log("start_time", startTimeDate, manager_id, emp_id, date);
  return (
    <div>
      <Button onClick={handleOpen}>Regularize</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress size={24} disableShrink />
            </div>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Stack direction={"column"} spacing={2}>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              value={dayjs(date)}
              onChange={(newDate) => setDate(newDate.format("YYYY-MM-DD"))}
              label="Date"
            />
            <Stack direction={"row"} spacing={2}>
              <TimePicker
                slotProps={{ textField: { size: "small" } }}
                value={dayjs(startTimeDate)}
                onChange={(newTime) => setStartTimeDate(newTime)} // Assuming the new time value is directly provided by the onChange event
                label="Start Time"
              />

              <TimePicker
                slotProps={{ textField: { size: "small" } }}
                value={dayjs(endTimeDate)}
                onChange={(newTime) => setEndTimeDate(newTime)}
                label="End time"
              />
            </Stack>
            <Button onClick={handleClick}>Regularize</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
