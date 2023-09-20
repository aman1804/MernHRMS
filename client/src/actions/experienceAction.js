// actions.js
import axios from 'axios';
import {
  CREATE_EXPERIENCE_REQUEST,
  CREATE_EXPERIENCE_SUCCESS,
  CREATE_EXPERIENCE_FAIL,
  FETCH_ALL_EXPERIENCES_REQUEST,
  FETCH_ALL_EXPERIENCES_SUCCESS,
  FETCH_ALL_EXPERIENCES_FAIL,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_REQUEST,
  // ... other action types
} from '../constants/experienceConstants';

// Create Experience
export const createExperience = (experienceData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EXPERIENCE_REQUEST });

    try {
      const response = await axios.post('/experience/create', experienceData);
      dispatch({ type: CREATE_EXPERIENCE_SUCCESS, experience: response.data });
    } catch (error) {
      dispatch({ type: CREATE_EXPERIENCE_FAIL, error: 'An error occurred while creating the experience.' });
    }
  };
};


// Fetch All Experiences
export const fetchAllExperiences = (emp_id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_EXPERIENCES_REQUEST });

    try {
      const response = await axios.get(`/experience/employee/${emp_id}`);
      console.log(response.data)
      dispatch({ type: FETCH_ALL_EXPERIENCES_SUCCESS, experiences: response.data });
    } catch (error) {
      console.log(error)
      dispatch({ type: FETCH_ALL_EXPERIENCES_FAIL, error: 'An error occurred while fetching experiences.' });
    }
  };
};

// Similarly, create actions for fetching, updating, and deleting single experiences
export const updateExperience = (experienceData,itemId) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_EXPERIENCE_REQUEST });
  
      try {
        const response = await axios.put(`/experience/update/${itemId}`, experienceData);
        dispatch({ type: UPDATE_EXPERIENCE_SUCCESS, experience: response.data });
      } catch (error) {
        dispatch({ type: UPDATE_EXPERIENCE_FAIL, error: 'An error occurred while creating the experience.' });
      }
    };
  };

  export const deleteExperience = (itemId) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_EXPERIENCE_REQUEST });
  
      try {
        const response = await axios.delete(`/experience/delete/${itemId}`);
        dispatch({ type: DELETE_EXPERIENCE_SUCCESS, experience: response.data });
      } catch (error) {
        dispatch({ type: DELETE_EXPERIENCE_FAIL, error: 'An error occurred while creating the experience.' });
      }
    };
  };
