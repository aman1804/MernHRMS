import { Box, Container, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById, getProjectDetails } from "../../actions/projectActions";

const SingleProject = ({ project_id }) => {
  const dispatch=useDispatch();
  const { loading:projectLoading,project,error:projectError } = useSelector((state) => state.projects);

  useEffect(() => {
    if(project_id)
    { 
        dispatch(getProjectDetails(project_id))
        console.log('in loop')
    }
  }, [project_id]);

  return (
    <Container maxWidth="md">
      {projectLoading &&
      <LinearProgress
      sx={{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginX: 0.25,
      }}
    />}
      <Paper className={{}} elevation={3} sx={{paddingY:3}}>
        <Typography variant="h5" gutterBottom>
          Project Details
        </Typography>
        {project && <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {project.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Description:</strong> {project.description}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Start Date:</strong> {project.startDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>End Date:</strong> {project.endDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Team Members:</strong>{" "}
              {project && project.teamMembersNames && project.teamMembersNames.length > 0 && (
  project.teamMembersNames.map((member) => (
    <span>{member}, </span>
  ))
)}

            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Manager:</strong> {project.managerName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Status:</strong> {project.status}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Priority:</strong> {project.priority}
            </Typography>
          </Grid>
        </Grid>}
      </Paper>
    </Container>
  );
};

export default SingleProject;
