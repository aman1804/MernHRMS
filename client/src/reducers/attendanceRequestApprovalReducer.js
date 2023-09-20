// attendanceRequestReducer.js
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

const initialState = {
  loading: false,
  error: null,
  data: [],
  success: null,
};

const attendanceRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case CREATE_ATTENDANCE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload.message,
      };
    case CREATE_ATTENDANCE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    case FETCH_ATTENDANCE_REQUEST_APPROVALS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ATTENDANCE_REQUEST_APPROVALS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_ATTENDANCE_REQUEST_APPROVALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ATTENDANCE_REQUEST_APPROVAL_REQUEST:
      return { ...state, loading: true, error: null, updatedApproval: null };

    case UPDATE_ATTENDANCE_REQUEST_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: null,
      };

    case UPDATE_ATTENDANCE_REQUEST_APPROVAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };


      case RESET_SUCCESS:
      return {
        ...state,
        success: null, // Reset success to null
      };

    default:
      return state;
  }
};

const getAttendanceRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE_REQUEST_APPROVALS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ATTENDANCE_REQUEST_APPROVALS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_ATTENDANCE_REQUEST_APPROVALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default attendanceRequestReducer;
