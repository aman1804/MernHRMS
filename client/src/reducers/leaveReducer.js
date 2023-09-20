// reducers.js

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
    FETCH_LEAVE_DETAILS_REQUEST_FAILURE,
    FETCH_LEAVE_DETAILS_REQUEST_SUCCESS,
    FETCH_LEAVE_DETAILS_REQUEST,
  } from "../constants/leaveConstants";
  
  const initialState = {
    leaveRequests: [],
    loading: false,
    error: null,
    success: false,
    applyLeaveLoading: false,
    applyLeaveError: null,
    applyLeaveMessage: null,
    approveLeaveLoading: false,
    approveLeaveError: null,
    approveLeaveMessage: null,
    leaveRequestDetails:null,
  };
  
  const leaveReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LEAVE_REQUESTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          success: false,
        };
      case FETCH_LEAVE_REQUESTS_SUCCESS:
        return {
          ...state,
          loading: false,
          leaveRequests: action.payload,
          error: null,
          success: true,
        };
      case FETCH_LEAVE_REQUESTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false,
        };
        case FETCH_LEAVE_DETAILS_REQUEST:
      return {
        ...state,
        leaveRequestDetailsloading: true,
        error: null,
      };
    case FETCH_LEAVE_DETAILS_REQUEST_SUCCESS:
      return {
        ...state,
        leaveRequestDetails: action.payload.data,
        leaveRequestDetailsloading: false,
        error: null,
      };
    case FETCH_LEAVE_DETAILS_REQUEST_FAILURE:
      return {
        ...state,
        leaveRequestDetails: null,
        leaveRequestDetailsloading: false,
        error: action.payload.error,
      };
      case APPLY_LEAVE_REQUEST:
        return {
          ...state,
          applyLeaveLoading: true,
          applyLeaveMessage: null,
          applyLeaveError: null,
          success: false,
        };
      case APPLY_LEAVE_SUCCESS:
        return {
          ...state,
          applyLeaveLoading: false,
          applyLeaveMessage: action.payload,
          applyLeaveError: null,
          success: true,
        };
      case APPLY_LEAVE_FAILURE:
        return {
          ...state,
          applyLeaveLoading: false,
          applyLeaveError: action.payload,
          applyLeaveMessage: null,
          success: false,
        };
      case APPROVE_LEAVE_REQUEST:
        return {
          ...state,
          approveLeaveLoading: true,
          approveLeaveError: null,
          success: false,
        };
      case APPROVE_LEAVE_SUCCESS:
        return {
          ...state,
          approveLeaveLoading: false,
          approveLeaveMessage: action.payload,
          approveLeaveError: null,
          success: true,
        };
      case APPROVE_LEAVE_FAILURE:
        return {
          ...state,
          approveLeaveLoading: false,
          approveLeaveError: action.payload,
          approveLeaveMessage: "",
          success: false,
        };
      default:
        return state;
    }
  };
  
  export default leaveReducer;
  