// employeeReducer.js
import {
    FETCH_EMPLOYEES_UNDER_MANAGER_REQUEST,
    FETCH_EMPLOYEES_UNDER_MANAGER_SUCCESS,
    FETCH_EMPLOYEES_UNDER_MANAGER_FAILURE,
    GET_ACTIVE_EMPLOYEES_REQUEST,
    GET_ACTIVE_EMPLOYEES_SUCCESS,
    GET_ACTIVE_EMPLOYEES_FAILURE,
    GET_ACTIVE_EMPLOYEES_DATA_REQUEST,
    GET_ACTIVE_EMPLOYEES_DATA_SUCCESS,
    GET_ACTIVE_EMPLOYEES_DATA_FAILURE,
  } from '../constants/employeeConstants';
  
  const initialState = {
    loading: false,
    employees: [],
    activeEmployees:null,
    empData:null,
    error: null,
  };
  
  const allEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES_UNDER_MANAGER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_EMPLOYEES_UNDER_MANAGER_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: action.payload,
          error: null,
        };
      case FETCH_EMPLOYEES_UNDER_MANAGER_FAILURE:
        return {
          ...state,
          loading: false,
          employees: [],
          error: action.payload,
        };




        case GET_ACTIVE_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTIVE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        activeEmployees: action.payload,
        loading: false,
        error: null,
      };
    case GET_ACTIVE_EMPLOYEES_FAILURE:
      return {
        ...state,
        activeEmployees: [],
        loading: false,
        error: action.payload,
      };



      case GET_ACTIVE_EMPLOYEES_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ACTIVE_EMPLOYEES_DATA_SUCCESS:
        return {
          ...state,
          empData: action.payload,
          loading: false,
          error: null,
        };
      case GET_ACTIVE_EMPLOYEES_DATA_FAILURE:
        return {
          ...state,
          empData: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };



  
  export default allEmployeeReducer;
  