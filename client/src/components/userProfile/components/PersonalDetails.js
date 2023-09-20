import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../actions/userActions";

const PersonalDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male"); // Default value
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+"); // Default value
  const [maritalStatus, setMaritalStatus] = useState("Single"); // Default value
  const [user_id, setUser_id] = useState("");
  const [emp_id, setEmp_id] = useState("");
  const [alertInfo, setAlertInfo] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setGender(userInfo.gender);
    setDob(userInfo.dob.slice(0, 10));
    setBloodGroup(userInfo.blood_group);
    setMaritalStatus(userInfo.marital_status);
    setUser_id(userInfo.user_id);
    setEmp_id(userInfo.emp_id)
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
setAlertInfo(true)
    dispatch(updateProfile({ firstName,lastName,gender,dob,bloodGroup,maritalStatus,user_id,emp_id }));
  };
  return (
    <>
      
      <Box
        component="form"
        noValidate
        onSubmit={submitHandler}
        sx={{
          backgroundColor: "white",
          
          paddingTop:0,
          borderRadius: 1,
          boxShadow: 1,
          marginBottom: 2,
        }}
      >
        {loading && <LinearProgress
        sx={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          // marginX: 0.25,
        }}
         disableShrink />}
         
        <Paper sx={{padding: 3,}}>
        {alertInfo && (
          <>
            {error && (
              <Alert
                severity="error"
                onClose={() => setAlertInfo(false)}
                sx={{ width: "100%", marginBottom: 2 }}
              >
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                onClose={() => setAlertInfo(false)}
                sx={{ width: "100%", marginBottom: 2 , }}
              >
                <AlertTitle>Success</AlertTitle>
                Profile Updated Successfully
              </Alert>
            )}
          </>
        )}

        <Grid container spacing={2} textAlign={"start"}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              size="small"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              size="small"
              label="Gender"
              variant="outlined"
              fullWidth
              name="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              size="small"
              fullWidth
              id="DOB"
              label="Date of Birth"
              name="dob"
              autoComplete=""
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              size="small"
              label="Blood Group"
              variant="outlined"
              name="blood_group"
              fullWidth
              required
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              select
              label="Marital Status"
              variant="outlined"
              fullWidth
              name="marital_status"
              required
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Widow">Widow</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Button
            type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} disableShrink /> : "Save"}
            </Button>
          </Grid>
        </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default PersonalDetails;
