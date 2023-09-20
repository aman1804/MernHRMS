import axios from "axios";
import {
    FETCH_EMPLOYEE_ATTENDANCE_FAILURE,
  FETCH_EMPLOYEE_ATTENDANCE_REQUEST,
  FETCH_EMPLOYEE_ATTENDANCE_SUCCESS,
  FETCH_PRESENT_DATES_FAILURE,
  FETCH_PRESENT_DATES_REQUEST,
  FETCH_PRESENT_DATES_SUCCESS,
  GET_ATTENDANCE_TIMES_FAILURE,
  GET_ATTENDANCE_TIMES_REQUEST,
  GET_ATTENDANCE_TIMES_SUCCESS,
  MARK_ATTENDANCE_FAILURE,
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
} from "../constants/attendanceConstants";

// Action creator to get attendance times for a specific employee
export const getAttendanceTimes = (emp_id) => async (dispatch) => {
  dispatch({ type: GET_ATTENDANCE_TIMES_REQUEST });

  try {
    const response = await axios.get(
      `/attendance/get-attendance-times/${emp_id}`
    );
    dispatch({ type: GET_ATTENDANCE_TIMES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ATTENDANCE_TIMES_FAILURE, error: error.message });
  }
};

export const markAttendance = (emp_id, tol) => async (dispatch) => {
  try {
    dispatch({ type: MARK_ATTENDANCE_REQUEST });

    const response = await axios.post("/attendance/mark", { emp_id, tol });

    dispatch({
      type: MARK_ATTENDANCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ATTENDANCE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const fetchPresentDates = (emp_id) => async (dispatch) => {
  dispatch({ type: FETCH_PRESENT_DATES_REQUEST });

  try {
    // Perform API request or data retrieval here
    // For simplicity, let's assume an async function fetchPresentDatesFromAPI
    const presentDates = await axios.get(
      `/attendance/get-present-dates/${emp_id}`
    );

    dispatch({
      type: FETCH_PRESENT_DATES_SUCCESS,
      payload: presentDates.data.presentDates,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRESENT_DATES_FAILURE,
      payload: error.message,
    });
  }
};

// Action creator for fetching employee attendance
export const fetchEmployeeAttendance = (emp_id,date) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EMPLOYEE_ATTENDANCE_REQUEST });

    const response = await axios.post(
      `/attendance/previous`,{ emp_id, date }
    );

    dispatch({
      type: FETCH_EMPLOYEE_ATTENDANCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EMPLOYEE_ATTENDANCE_FAILURE,
      payload: error.message,
    });
  }
};
