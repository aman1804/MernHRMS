import axios from 'axios';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,
  GET_PROJECT_BY_ID_REQUEST,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from '../constants/projectConstants';
import { PROJECT_DETAILS_REQUEST } from '../constants/projectConstants';
import { PROJECT_DETAILS_SUCCESS } from '../constants/projectConstants';
import { PROJECT_DETAILS_FAILURE } from '../constants/projectConstants';

// Create a new project
export const createProject = (projectData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROJECT_REQUEST });

    const response = await axios.post('/project/create', projectData);

    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Get a list of all projects
export const getAllProjects = (emp_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PROJECTS_REQUEST });

    const response = await axios.get(`/project/projects/get/${emp_id}`);

    dispatch({
      type: GET_ALL_PROJECTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROJECTS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Get a single project by ID
export const getProjectById = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECT_BY_ID_REQUEST });

    const response = await axios.get(`/project/get/${projectId}`);

    dispatch({
      type: GET_PROJECT_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_BY_ID_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};


// Get a single project by ID
export const getProjectDetails = (projectId) => async (dispatch) => {
    try {
      dispatch({ type: PROJECT_DETAILS_REQUEST });
  
      const response = await axios.get(`/project/single/${projectId}`);
  
      dispatch({
        type: PROJECT_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_DETAILS_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

// Update a project by ID
export const updateProject = (projectId, projectData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });

    const response = await axios.put(`/project/update/${projectId}`, projectData);

    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Delete a project by ID
export const deleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    await axios.delete(`/project/${projectId}`);

    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: projectId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
