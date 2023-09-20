import axios from 'axios';
import {
  FETCH_EDUCATIONS_REQUEST,
  FETCH_EDUCATIONS_SUCCESS,
  FETCH_EDUCATIONS_FAILURE,
  CREATE_EDUCATION_REQUEST,
  CREATE_EDUCATION_SUCCESS,
  CREATE_EDUCATION_FAILURE,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAILURE,
} from '../constants/educationConstants';

// Fetch educations
export const fetchAllEducations = (emp_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EDUCATIONS_REQUEST });

    const response = await axios.get(`/educations/get/${emp_id}`); // Adjust the API endpoint

    dispatch({ type: FETCH_EDUCATIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_EDUCATIONS_FAILURE, payload: error.message });
  }
};

// Create education
export const createEducation = (educationData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EDUCATION_REQUEST });

    const response = await axios.post('/educations/create', educationData); // Adjust the API endpoint

    dispatch({ type: CREATE_EDUCATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_EDUCATION_FAILURE, payload: error.message });
  }
};

// Update education
export const updateEducation = (educationData, educationId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EDUCATION_REQUEST });

    const response = await axios.put(`/educations/update/${educationId}`, educationData); // Adjust the API endpoint

    dispatch({ type: UPDATE_EDUCATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_EDUCATION_FAILURE, payload: error.message });
  }
};

// Delete education
export const deleteEducation = (educationId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EDUCATION_REQUEST });

    await axios.delete(`/educations/delete/${educationId}`); // Adjust the API endpoint

    dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: educationId });
  } catch (error) {
    dispatch({ type: DELETE_EDUCATION_FAILURE, payload: error.message });
  }
};
