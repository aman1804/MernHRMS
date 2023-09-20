import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Autocomplete, Box, MenuItem } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Helper function to convert a string to lowercase
const convertToLowerCase = (str) => {
  return str.toLowerCase();
};

export default function SignUp() {
  useEffect(() => {
    document.title = "Register";
  }, []);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [alertInfo, setAlertInfo] = useState(false);
  const [dobValid, setDobValid] = useState(true);
  const [genderValid, setGenderValid] = useState(true);
  const [bloodGroupValid, setBloodGroupValid] = useState(true);
  const [maritalStatusValid, setMaritalStatusValid] = useState(true);
  const [designationValid, setDesignationValid] = useState(true);

  const handleAutoCapitalize = (e, setValidState) => {
    const trimmedValue = e.target.value.trim();
    setValidState(trimmedValue !== "");
    e.target.value = capitalizeFirstLetter(trimmedValue);
  };
  const designationNames = [
    "Jr developer",
    "Developer",
    "Sr developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "QA Engineer",
  ];
  const handleLowercase = (e, setValidState) => {
    const trimmedValue = e.target.value.trim();
    setValidState(trimmedValue !== "");
    e.target.value = convertToLowerCase(trimmedValue);
  };

  const handleSubmit = async (event) => {
    setAlertInfo(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const dob = formData.get("dob");
    const gender = formData.get("gender");
    const blood_group = formData.get("blood_group");
    const marital_status = formData.get("marital_status");
    const designation = formData.get("designation");
    // ... Validation logic ...

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      dob &&
      gender &&
      blood_group &&
      marital_status &&
      designation
    ) {
      // Dispatch the Redux action
      dispatch(register(
        firstName,
        lastName,
        blood_group,
    gender,
    designation,
    dob,
    marital_status,
    email,
    password,
      ));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"main"} sx={{overflow:'auto'}} maxWidth="xl">
      <Container component="" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow:"auto"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {loading && <CircularProgress disableShrink />}
          {alertInfo && (
            <>
              {error && (
                <Alert
                  severity="error"
                  onClose={() => setAlertInfo(false)}
                  sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}
                >
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}

              {userInfo && (
                <Alert
                  severity="success"
                  onClose={() => setAlertInfo(false)}
                  sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}
                >
                  <AlertTitle>Success</AlertTitle>
                  Registration successful! Check your email for confirmation.
                </Alert>
              )}
            </>
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!firstNameValid}
                  helperText={!firstNameValid && "First name is required"}
                  onBlur={(e) => handleAutoCapitalize(e, setFirstNameValid)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!lastNameValid}
                  helperText={!lastNameValid && "Last name is required"}
                  onBlur={(e) => handleAutoCapitalize(e, setLastNameValid)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  required
                  fullWidth
                  disablePortal
                  id="designation"
                  options={designationNames}
                  
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!designationValid}
                  helperText={!designationValid && "Designation is required"}
                  onBlur={(e) => setDesignationValid(e.target.value)}
                      name="designation"
                      label="Designation"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  name="gender"
                  required
                  onBlur={(e) => setGenderValid(e.target.value)}
                  error={!genderValid}
                  helperText={!genderValid && "Gender is required"}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Blood Group"
                  variant="outlined"
                  name="blood_group"
                  fullWidth
                  required
                  onBlur={(e) => setBloodGroupValid(e.target.value)}
                  error={!bloodGroupValid}
                  helperText={!bloodGroupValid && "Blood Group is required"}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Marital Status"
                  variant="outlined"
                  fullWidth
                  name="marital_status"
                  required
                  onBlur={(e) => setMaritalStatusValid(e.target.value)}
                  error={!maritalStatusValid}
                  helperText={
                    !maritalStatusValid && "Marital Status is required"
                  }
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Widow">Widow</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="DOB"
                  label="Date of Birth"
                  name="dob"
                  autoComplete=""
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={(e) => setDobValid(e.target.value)}
                  error={!dobValid}
                  helperText={!dobValid && "Date of Birth is required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!emailValid}
                  helperText={!emailValid && "Email is required"}
                  onBlur={(e) => handleLowercase(e, setEmailValid)}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!passwordValid}
                  helperText={!passwordValid && "Password is required"}
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim();
                    setPassword(trimmedValue);
                    setPasswordValid(trimmedValue !== "");
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  error={passwordValid && confirmPassword !== password}
                  helperText={
                    passwordValid && confirmPassword !== password
                      ? "Passwords do not match"
                      : ""
                  }
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim();
                    setConfirmPassword(trimmedValue);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Container>
    </ThemeProvider>
  );
}
