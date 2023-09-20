// attendanceRequestActions.js
import axios from "axios";
import {
  CREATE_ATTENDANCE_REQUEST,
  CREATE_ATTENDANCE_REQUEST_FAILURE,
  CREATE_ATTENDANCE_REQUEST_SUCCESS,
  FETCH_ATTENDANCE_REQUEST_APPROVALS,
  FETCH_ATTENDANCE_REQUEST_APPROVALS_FAILURE,
  FETCH_ATTENDANCE_REQUEST_APPROVALS_SUCCESS,
  RESET_SUCCESS,
  UPDATE_ATTENDANCE_REQUEST_APPROVAL_FAILURE,
  UPDATE_ATTENDANCE_REQUEST_APPROVAL_REQUEST,
  UPDATE_ATTENDANCE_REQUEST_APPROVAL_SUCCESS,
} from "../constants/attendanceRequestApprovalConstants";

export const createAttendanceRequest =
  (manager_id, emp_id, date, start_time, end_time) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ATTENDANCE_REQUEST });

      const response = await axios.post("/attendance/request", {
        manager_id,
        emp_id,
        date,
        start_time,
        end_time,
      });

      dispatch({
        type: CREATE_ATTENDANCE_REQUEST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ATTENDANCE_REQUEST_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

export const getAttendanceRequestLists = (emp_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ATTENDANCE_REQUEST_APPROVALS });

    const response = await axios.get(`/attendance/request/get/${emp_id}`);

    dispatch({
      type: FETCH_ATTENDANCE_REQUEST_APPROVALS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ATTENDANCE_REQUEST_APPROVALS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const updateAttendanceRequestApproval =
  (id, status, remark) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ATTENDANCE_REQUEST_APPROVAL_REQUEST });

      const response = await axios.put(
        `/attendance/request-approval/${id}`,
        {
          status,
          remark,
        }
      );

      dispatch({
        type: UPDATE_ATTENDANCE_REQUEST_APPROVAL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ATTENDANCE_REQUEST_APPROVAL_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };


  export const resetSuccess = () => {
    return {
      type: RESET_SUCCESS,
    };
  };