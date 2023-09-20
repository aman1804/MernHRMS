// actions.js
import axios from 'axios';
import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
} from '../constants/userConstants';
import { BASE_URL } from './Urls';
import { FETCH_EMPLOYEES_UNDER_MANAGER_FAILURE, FETCH_EMPLOYEES_UNDER_MANAGER_REQUEST, FETCH_EMPLOYEES_UNDER_MANAGER_SUCCESS, GET_ACTIVE_EMPLOYEES_DATA_FAILURE, GET_ACTIVE_EMPLOYEES_DATA_REQUEST, GET_ACTIVE_EMPLOYEES_DATA_SUCCESS, GET_ACTIVE_EMPLOYEES_FAILURE, GET_ACTIVE_EMPLOYEES_REQUEST, GET_ACTIVE_EMPLOYEES_SUCCESS } from '../constants/employeeConstants';

export const addAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ADDRESS_REQUEST });

    const response = await axios.post(`${BASE_URL}/user/addAddress`, addressData);

    dispatch({
      type: ADD_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ADDRESS_FAILURE,
      payload: error.message,
    });
  }
};




export const getAddress = (employeeId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADDRESS_REQUEST });

    const response = await axios.get(`${BASE_URL}/user/address/${employeeId}`);

    dispatch({
      type: GET_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADDRESS_FAILURE,
      payload: error.message,
    });
  }
};




// Action creators
export const fetchEmployeesUnderManager = (managerId) => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEES_UNDER_MANAGER_REQUEST });

  try {
    const response = await axios.get(`/user/employees/manager/${managerId}`); // Replace with your API endpoint
    dispatch({
      type: FETCH_EMPLOYEES_UNDER_MANAGER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EMPLOYEES_UNDER_MANAGER_FAILURE,
      payload: error.message,
    });
  }
};




export const fetchActiveEmployees = () => async (dispatch) => {
  dispatch({ type: GET_ACTIVE_EMPLOYEES_REQUEST });

  try {
    const response = await axios.get(`/user/get`); // Replace with your API endpoint
    dispatch({
      type: GET_ACTIVE_EMPLOYEES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACTIVE_EMPLOYEES_FAILURE,
      payload: error.message,
    });
  }
};




export const fetchActiveEmployeesData = (id) => async (dispatch) => {
  dispatch({ type: GET_ACTIVE_EMPLOYEES_DATA_REQUEST });

  try {
    const response = await axios.get(`/user/get/empdata/${id}`); // Replace with your API endpoint
    dispatch({
      type: GET_ACTIVE_EMPLOYEES_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACTIVE_EMPLOYEES_DATA_FAILURE,
      payload: error.message,
    });
  }
};