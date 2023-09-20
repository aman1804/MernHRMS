import React, { useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
  Toolbar,
  LinearProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveEmployeesData } from '../../actions/employeeAction';
import { useParams } from 'react-router-dom';

function EmpProfile({ userInfo }) {
    const { loading, error,empData } = useSelector(
        (state) => state.employees
      );
const {emp_id}=useParams();
console.log(emp_id)
console.log(empData)
      const dispatch=useDispatch()
      useEffect(() => {
        dispatch(fetchActiveEmployeesData(emp_id))
      }, [emp_id])
  if (!empData) {
    return null;
  }
  
  const {
    employee,
    experiences,
    education,
    addresses,
  } = empData;

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
      <Paper elevation={3} style={{ padding: '0px' }}>
      
      {loading &&<LinearProgress
      sx={{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // marginX: 0.25,
      }}
    />}
    <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Employee Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Name:</strong> {employee.first_name} {employee.last_name}
            </Typography>
            <Typography variant="body1">
              <strong>Designation:</strong> {employee.designation}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {employee.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Blood Group:</strong> {employee.blood_group}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Marital Status:</strong> {employee.marital_status}
            </Typography>
          </Grid>
          <Grid item xs={6}>
           
            <Typography variant="body1">
              <strong>Joining Date:</strong> {new Date(employee.createdAt).toLocaleDateString()}
            </Typography>

          </Grid>
        </Grid>
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Experiences:
        </Typography>
        {experiences.map((experience) => (
          <Paper key={experience._id} elevation={1} style={{ padding: '10px', marginBottom: '10px' }}>
            <Typography variant="subtitle1">
              <strong>Job Title:</strong> {experience.job_title}
            </Typography>
            <Typography variant="body2">
              <strong>Company:</strong> {experience.company}
            </Typography>
            <Typography variant="body2">
              <strong>Start Date:</strong> {new Date(experience.start_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>End Date:</strong> {new Date(experience.end_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {experience.description}
            </Typography>
            <Typography variant="body2">
              <strong>Skills:</strong> {experience.skills.join(', ')}
            </Typography>
          </Paper>
        ))}
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Education:
        </Typography>
        {education.map((education) => (
          <Paper key={education._id} elevation={1} style={{ padding: '10px', marginBottom: '10px' }}>
            <Typography variant="subtitle1">
              <strong>Qualification:</strong> {education.qualification}
            </Typography>
            <Typography variant="body2">
              <strong>Stream:</strong> {education.stream}
            </Typography>
            <Typography variant="body2">
              <strong>Institute:</strong> {education.institute}
            </Typography>
            <Typography variant="body2">
              <strong>University:</strong> {education.university}
            </Typography>
            <Typography variant="body2">
              <strong>Grade:</strong> {education.grade}
            </Typography>
            <Typography variant="body2">
              <strong>Passing Year:</strong> {education.passing_year}
            </Typography>
          </Paper>
        ))}
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Address:
        </Typography>
        {addresses.map((address) => (
        
        <Paper elevation={1} style={{ padding: '10px', marginBottom: '10px' }}>
          <Typography variant="body2">
            <strong>Street:</strong> {address.street}
          </Typography>
          <Typography variant="body2">
            <strong>Locality:</strong> {address.locality}
          </Typography>
          <Typography variant="body2">
            <strong>Country:</strong> {address.country}
          </Typography>
          <Typography variant="body2">
            <strong>State:</strong> {address.state}
          </Typography>
          <Typography variant="body2">
            <strong>City:</strong> {address.city}
          </Typography>
          <Typography variant="body2">
            <strong>Pincode:</strong> {address.pincode}
          </Typography>
        </Paper>
        ))}
      </Paper>
      </Paper>
    </Container>
    </Box>
  );
}

export default EmpProfile;
