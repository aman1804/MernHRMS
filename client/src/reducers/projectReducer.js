import * as types from "../constants/projectConstants";

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PROJECT_REQUEST:
    case types.GET_ALL_PROJECTS_REQUEST:
    case types.GET_PROJECT_BY_ID_REQUEST:
    case types.UPDATE_PROJECT_REQUEST:
    case types.DELETE_PROJECT_REQUEST:
    case types.PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.payload],
      };
    case types.GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case types.GET_PROJECT_BY_ID_SUCCESS:
    case types.PROJECT_DETAILS_SUCCESS:
    case types.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case types.CREATE_PROJECT_FAILURE:
    case types.GET_ALL_PROJECTS_FAILURE:
    case types.GET_PROJECT_BY_ID_FAILURE:
    case types.UPDATE_PROJECT_FAILURE:
    case types.DELETE_PROJECT_FAILURE:
    case types.PROJECT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
