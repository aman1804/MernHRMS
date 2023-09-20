import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  us,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/AuthUser/Login";
import SignUp from "./components/AuthUser/SignUp";
import MyProfile from "./components/userProfile/MyProfile";
import MyComponent from "./components/Home/Home";
import ForgotPassword from "./components/AuthUser/ForgotPassword";
import ResetPassword from "./components/AuthUser/ResetPassword";
import NotFound from "./components/notfound/NotFound";
import MyAttendance from "./components/MyAttendance/MyAttendance";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DataTable from "./components/MyAttendance/Attendance_Requests";
import Attendance_Requests from "./components/MyAttendance/Attendance_Requests";
import ManageProject from "./components/Projects/ManageProject";
import Projects from "./components/Projects/Projects";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Leaves from "./components/Leaves/Leaves";
import LeaveRequests from "./components/Leaves/LeaveRequests";
import CompanyDirectory from "./components/Company Directory/CompanyDirectory";
import EmpProfile from "./components/Company Directory/EmpProfile";

function App() {
  // const userInfo = localStorage.getItem("userInfo");
  const [isAuthenticated, setIsAuthenticated] = useState();
  // const navigate=useNavigate()

  // useEffect(() => {

  //     if(!isAuthenticated){
  //       try {
  //         navigate('/login');
  //       } catch (error) {
  //         console.error('Navigation error:', error);
  //       }
  //     }
  // }, [userInfo])

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate=useNavigate()
  useEffect(() => {
    // console.log(userInfo.isAdmin)
    setIsAuthenticated(userInfo);
  }, [userInfo]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout Element={<MyComponent />} title={"Dashboard"} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Layout Element={<MyProfile />} title={"Profile"} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/myattendance"
            element={
              isAuthenticated ? (
                <Layout Element={<MyAttendance />} title={"My Attendance"} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/attendance_requests"
            element={
              isAuthenticated ? (
                <Layout
                  Element={<Attendance_Requests />}
                  title={"Attendance Request"}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/projects"
            element={
              isAuthenticated ? (
                <Layout Element={<Projects />} title={"Projects"} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/manage_projects"
            element={
              isAuthenticated ? (
                <Layout Element={<ManageProject />} title={"Manage Projects"} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/leave"
            element={
              isAuthenticated ? (
                <Layout
                  Element={<Leaves userInfo={userInfo} />}
                  title={"Leave"}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/leave_requests"
            element={
              isAuthenticated ? (
                <Layout
                  Element={<LeaveRequests userInfo={userInfo} />}
                  title={"Leave Requests"}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/company_directory"
            element={
              isAuthenticated ? (
                <Layout
                  Element={<CompanyDirectory userInfo={userInfo} />}
                  title={"Company Directory"}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

<Route
            path="/emp_data/:emp_id"
            element={
              isAuthenticated ? (
                <Layout
                  Element={<EmpProfile userInfo={userInfo} />}
                  title={"Employee Profile"}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/Register"
            element={
              !isAuthenticated ? <SignUp /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/forgot-password"
            element={
              !isAuthenticated ? (
                <ForgotPassword />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              !isAuthenticated ? <ResetPassword /> : <Navigate to="/" replace />
            }
          />
          <Route path="/test" element={<MyComponent />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* This will match all unknown routes */}
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
