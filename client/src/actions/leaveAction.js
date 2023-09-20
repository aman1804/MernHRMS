// actions.js
import axios from 'axios';
import {
  APPLY_LEAVE_REQUEST,
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_FAILURE,
  APPROVE_LEAVE_REQUEST,
  APPROVE_LEAVE_SUCCESS,
  APPROVE_LEAVE_FAILURE,
  FETCH_LEAVE_REQUESTS_REQUEST,
  FETCH_LEAVE_REQUESTS_SUCCESS,
  FETCH_LEAVE_REQUESTS_FAILURE,
  FETCH_LEAVE_DETAILS_REQUEST,
  FETCH_LEAVE_DETAILS_REQUEST_SUCCESS,
  FETCH_LEAVE_DETAILS_REQUEST_FAILURE,
} from '../constants/leaveConstants';

export const applyLeave = (leaveData) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_LEAVE_REQUEST });

    const response = await axios.post('/leave/apply', leaveData); // Adjust the API endpoint as needed

    dispatch({
      type: APPLY_LEAVE_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: APPLY_LEAVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};


export const fetchLeaveRequestsforEmployee = (employeeId) => async (dispatch) => {
    dispatch({ type: FETCH_LEAVE_REQUESTS_REQUEST });
  
    try {
      const response = await axios.get(`/leave/requests/${employeeId}`); // Replace with your API endpoint
      const leaveRequests = response.data;
  
      dispatch({
        type: FETCH_LEAVE_REQUESTS_SUCCESS,
        payload: leaveRequests,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LEAVE_REQUESTS_FAILURE,
        payload: error.message,
      });
    }
  };

  export const fetchLeaveRequestsforManager = (employeeId) => async (dispatch) => {
    dispatch({ type: FETCH_LEAVE_REQUESTS_REQUEST });
  
    try {
      const response = await axios.get(`/leave/requests/manager/${employeeId}`); // Replace with your API endpoint
      const leaveRequests = response.data;
  
      dispatch({
        type: FETCH_LEAVE_REQUESTS_SUCCESS,
        payload: leaveRequests,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LEAVE_REQUESTS_FAILURE,
        payload: error.message,
      });
    }
  };


export const approveLeave = (leaveId, status) => async (dispatch) => {
    try {
      dispatch({ type: APPROVE_LEAVE_REQUEST });
  
      const response = await axios.put(`/leave/approve/${leaveId}`, { status }); // Adjust the API endpoint as needed
  
      dispatch({
        type: APPROVE_LEAVE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: APPROVE_LEAVE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };



export const fetchLeaveRequestDetails = (leaveRequestId) => async (dispatch) => {
    // Dispatch the request action
    dispatch({ type: FETCH_LEAVE_DETAILS_REQUEST});
  
    try {
      // Make the API request to fetch leave details using Axios
      const response = await axios.get(`/leave/requests/details/${leaveRequestId}`);
  
      // Dispatch the success action with the data
      dispatch({
        type: FETCH_LEAVE_DETAILS_REQUEST_SUCCESS,
        payload: { data: response.data },
      });
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch({
        type: FETCH_LEAVE_DETAILS_REQUEST_FAILURE,
        payload: { error: error.message },
      });
    }
  };