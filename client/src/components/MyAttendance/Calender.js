import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeAttendance,
  fetchPresentDates,
} from "../../actions/attendanceAction";
import CircleIcon from "@mui/icons-material/Circle";
import Regularize_Modal from "./Regularize_Attendance_Modal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#60ab5c",
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-holiday": {
    backgroundColor: "#f29a94", // Change this to your desired holiday color
    color: "white",
  },
  "&.Mui-employee-leave": {
    backgroundColor: "#768ab5", // Change this to your desired employee leave color
    color: theme.palette.primary.contrastText,
  },
}));

const ServerDay = (props) => {
  const {
    highlightedDays = [],
    leaveDays = [],
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    (highlightedDays.includes(day.format("YYYY-MM-DD")) ||
      leaveDays.includes(day.format("YYYY-MM-DD")));

  const isHoliday = day.day() === 0 || day.day() === 6; // Sunday or Saturday

  const isEmployeeLeave = leaveDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
      className={
        isHoliday ? "Mui-holiday" : isEmployeeLeave ? "Mui-employee-leave" : ""
      }
    />
  );
};

const Calender = ({ emp_id,manager_id }) => {
  const dispatch = useDispatch();
  const { end_time, start_time, loading, presentDates, error } = useSelector(
    (state) => state.attendance
  );

  const leaveDays = ["2023-08-01", "2023-08-04", "2023-08-07"];
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with current date

  useEffect(() => {
    dispatch(fetchPresentDates(emp_id));
  }, [dispatch]);
  console.log(presentDates);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    dispatch(fetchEmployeeAttendance(emp_id, newDate.format("YYYY-MM-DD")));
    console.log(selectedDate.format("YYYY-MM-DD"));
  };

  const highlightedDays = presentDates.map((dateString) =>
    dayjs(dateString).format("YYYY-MM-DD")
  );

  return (
    <Box sx={{marginX:5 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} firstDayOfWeek={1}>
        <Stack
          position={"relative"}
          direction={"row"}
          spacing={5}
          mx={2}
          mb={2}
        >
          {loading ? (
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
          ) : (
            <>
              <Chip label={`Start  ${start_time}`} />
              <Chip label={`End  ${end_time}`} />
            </>
          )}
        </Stack>
        <DateCalendar
        sx={{}}
          value={selectedDate}
          onChange={handleDateChange}
          maxDate={dayjs()}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
              leaveDays,
            },
          }}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <>
            <CircleIcon sx={{ color: "#60ab5c" }} /> present
          </>
          <>
            <CircleIcon sx={{ color: "#f29a94" }} />
            Weekend
          </>
          <>
            <CircleIcon sx={{ color: "#768ab5" }} />
            leaves
          </>
        </Stack>
        <Regularize_Modal
          selectedDate={selectedDate.format("YYYY-MM-DD")}
          start_time={start_time}
          end_time={end_time}
          emp_id={emp_id}
          manager_id={manager_id}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Calender;
