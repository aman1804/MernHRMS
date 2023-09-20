// reducer.js
import {
    CREATE_EXPERIENCE_REQUEST,
    CREATE_EXPERIENCE_SUCCESS,
    CREATE_EXPERIENCE_FAIL,
    FETCH_ALL_EXPERIENCES_REQUEST,
    FETCH_ALL_EXPERIENCES_SUCCESS,
    FETCH_ALL_EXPERIENCES_FAIL,
    UPDATE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_REQUEST,
    UPDATE_EXPERIENCE_FAIL,
    DELETE_EXPERIENCE_REQUEST,
    DELETE_EXPERIENCE_SUCCESS,
    // ... other action types
  } from '../constants/experienceConstants';
  
  const initialState = {
    experiences: [],
    selectedExperience: null,
    loading: false,
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      // Create Experience
      case CREATE_EXPERIENCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_EXPERIENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          success:true,
          error:null,
          experiences: [...state.experiences, action.experience],
        };
      case CREATE_EXPERIENCE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      // Fetch All Experiences
      case FETCH_ALL_EXPERIENCES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ALL_EXPERIENCES_SUCCESS:
        return {
          ...state,
          loading: false,
          error:null,
          experiences: action.experiences,
        };
      case FETCH_ALL_EXPERIENCES_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };



        case UPDATE_EXPERIENCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_EXPERIENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          success:true,
          error:null,
          experiences: action.experiences,
        };
      case UPDATE_EXPERIENCE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };




        case DELETE_EXPERIENCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_EXPERIENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          success:true,
          error:null,
        };
      case DELETE_EXPERIENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      // Similarly, handle other action types
      default:
        return state;
    }
  };
  
  export default reducer;
  