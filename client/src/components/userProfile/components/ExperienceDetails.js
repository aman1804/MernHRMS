import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CssBaseline, Grid, TextField, Typography } from '@mui/material';
// import { addExperience, getExperiencesByEmployeeId } from '../../../actions/experienceActions';

const ExperienceDetails = ({key}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    company: '',
    // Add more fields here
  });

//   useEffect(() => {
//     dispatch(getExperiencesByEmployeeId(userInfo.emp_id));
//   }, [dispatch, userInfo]);

  const handleInputChange = (e, field) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, newExperience]);
    setNewExperience({
      jobTitle: '',
      company: '',
      // Reset other fields
    });
  };

  const handleSaveExperiences = () => {
    // Dispatch an action to save experiences to the backend
    // dispatch(addExperience({ emp_id: userInfo.emp_id, experiences }));
    // Clear the experiences array after saving
    setExperiences([]);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={{}}
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 1,
          justifyContent:"center" ,
          mb:2,
        }}
      >
        {/* {loading && <CircularProgress disableShrink />}
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
        )} */}
        

        <Grid container spacing={2} textAlign={"start"}>
        
          <Grid item xs={12} sm={6}>
        <TextField
          label="Job Title"
          variant="outlined"
          fullWidth
          size="small"
          value={newExperience.jobTitle}
          onChange={(e) => handleInputChange(e, 'jobTitle')}
          sx={{ mb: 2 }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="Company"
          variant="outlined"
          fullWidth
          size="small"
          value={newExperience.jobTitle}
          onChange={(e) => handleInputChange(e, 'jobTitle')}
          sx={{ mb: 2 }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          size="small"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={newExperience.jobTitle}
          onChange={(e) => handleInputChange(e, 'jobTitle')}
          sx={{ mb: 2 }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="End Date"
          variant="outlined"
          fullWidth
          size="small"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={newExperience.jobTitle}
          onChange={(e) => handleInputChange(e, 'jobTitle')}
          sx={{ mb: 2 }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="Job Description"
          variant="outlined"
          size="small"
          fullWidth
          value={newExperience.jobTitle}
          onChange={(e) => handleInputChange(e, 'jobTitle')}
          sx={{ mb: 2 }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="Skills"
          variant="outlined"
          fullWidth
          size="small"
          value={newExperience.jobTitle}
          onChange={(e) => handleInputChange(e, 'jobTitle')}
          sx={{ mb: 2 }}
          
        />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" onClick={handleSaveExperiences}>
          Save Experiences
        </Button>
        </Grid>
</Grid>

</Box>
    </>
  );
};

export default ExperienceDetails;
