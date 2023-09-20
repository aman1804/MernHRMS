import { Box, Container, Grid, Toolbar } from "@mui/material";
import React from "react";
import AddNewProjects from "./AddNewProjects";
import AccessibleTable from "./List_of_Projects";
import { useSelector } from "react-redux";
import SingleProject from "./SingleProject";


const Projects = () => {
    const [project_id,setProject_id]=React.useState()
    const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
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

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} textAlign={"center"}>
            <Grid item xs={12} lg={4}>
                <AccessibleTable userInfo={userInfo} setProject_id={setProject_id}/>
            </Grid>
            <Grid item xs={12} lg={8}>
                <SingleProject project_id={project_id}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Projects
