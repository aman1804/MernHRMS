import { createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userForgotPasswordReducer, userLoginReducer, userRegisterReducer, userResetPasswordReducer, userUpdateReducer } from "./reducers/userReducer";
import addressReducer from "./reducers/employeeReducer";
import experienceReducer from "./reducers/experienceReducer"
import educationReducer from "./reducers/educationReducer";
import attendanceReducer from "./reducers/attendanceReducer";
import attendanceRequestReducer from "./reducers/attendanceRequestApprovalReducer";
import allEmployeeReducer from "./reducers/allEmployeeReducer";
import projectReducer from "./reducers/projectReducer";
import leaveReducer from "./reducers/leaveReducer";
const reducer = combineReducers({
    // this will contain our reduces
    userRegister: userRegisterReducer,
    userLogin:userLoginReducer,
    userUpdate:userUpdateReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    employeeAddress: addressReducer,
    employeeExperience:experienceReducer,
    employeeEducation: educationReducer,
    attendance:attendanceReducer,
    attendanceRequestApproval: attendanceRequestReducer,
    employees:allEmployeeReducer,
    projects:projectReducer,
    leave:leaveReducer

})
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};



const middleware = [thunk];

const store = createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
)

export default store; 