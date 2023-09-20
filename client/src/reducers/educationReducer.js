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
  
  const initialState = {
    loading: false,
    educations: [],
    success: false,
    error: null,
  };
  
  const educationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EDUCATIONS_REQUEST:
      case CREATE_EDUCATION_REQUEST:
      case UPDATE_EDUCATION_REQUEST:
      case DELETE_EDUCATION_REQUEST:
        return { ...state, loading: true, success: false, error: null };
  
      case FETCH_EDUCATIONS_SUCCESS:
        return { ...state, loading: false, educations: action.payload, success: true };
  
      case CREATE_EDUCATION_SUCCESS:
        return { ...state, loading: false, educations: [...state.educations, action.payload], success: true };
  
      case UPDATE_EDUCATION_SUCCESS:
        return {
          ...state,
          loading: false,
          educations: state.educations.map((edu) => (edu._id === action.payload._id ? action.payload : edu)),
          success: true,
        };
  
      case DELETE_EDUCATION_SUCCESS:
        return {
          ...state,
          loading: false,
          educations: state.educations.filter((edu) => edu._id !== action.payload),
          success: true,
        };
  
      case FETCH_EDUCATIONS_FAILURE:
      case CREATE_EDUCATION_FAILURE:
      case UPDATE_EDUCATION_FAILURE:
      case DELETE_EDUCATION_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default educationReducer;
  