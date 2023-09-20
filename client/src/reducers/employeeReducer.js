// reducer.js
import {
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILURE,
    GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  } from '../constants/userConstants';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ADDRESS_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
          error: null,
        };
      case ADD_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          address: true,
          error: null,
        };
      case ADD_ADDRESS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        address: null,
        error: null,
      };
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
        error: null,
      };
    case GET_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        address: null,
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  
  export default addressReducer;
  