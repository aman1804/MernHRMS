import {
  GET_ATTENDANCE_TIMES_REQUEST,
  GET_ATTENDANCE_TIMES_SUCCESS,
  GET_ATTENDANCE_TIMES_FAILURE,
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAILURE,
  FETCH_PRESENT_DATES_FAILURE,
  FETCH_PRESENT_DATES_SUCCESS,
  FETCH_PRESENT_DATES_REQUEST,
  FETCH_EMPLOYEE_ATTENDANCE_REQUEST,
  FETCH_EMPLOYEE_ATTENDANCE_SUCCESS,
  FETCH_EMPLOYEE_ATTENDANCE_FAILURE,
} from "../constants/attendanceConstants";

const initialState = {
  start_time: null,
  end_time: null,
  loading: false,
  error: null,
  presentDates: [],
};

const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ATTENDANCE_TIMES_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ATTENDANCE_TIMES_SUCCESS:
      return {
        ...state,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
        loading: false,
      };
    case GET_ATTENDANCE_TIMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        start_time: null,
        end_time: null,
      };

    case MARK_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MARK_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
        error: null,
      };
    case MARK_ATTENDANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_PRESENT_DATES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRESENT_DATES_SUCCESS:
      return {
        ...state,
        loading: false,
        presentDates: action.payload,
        error: null,
      };
    case FETCH_PRESENT_DATES_FAILURE:
      return {
        ...state,
        loading: false,
        presentDates: [],
        error: action.payload,
      };

    case FETCH_EMPLOYEE_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMPLOYEE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
        error: null,
      };
    case FETCH_EMPLOYEE_ATTENDANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default attendanceReducer;
