import { Box, Container, Grid, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import AddNewProjects from "./AddNewProjects";
import AccessibleTable from "./List_of_Projects";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManageProject = () => {
    const [project_id,setProject_id]=React.useState()
    const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate=useNavigate()
  useEffect(() => {
    console.log(userInfo.isAdmin)
    if(!userInfo.isAdmin){
navigate('/')
    }
  }, [userInfo,navigate])
  
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

        <Container maxWidth="lg" sx={{ mt: 3, }}>
          <Grid container spacing={3} textAlign={"center"}>
            <Grid item xs={12} lg={4}>
                <AccessibleTable userInfo={userInfo} setProject_id={setProject_id}/>
            </Grid>
            <Grid item xs={12} lg={8}>
                <AddNewProjects userInfo={userInfo} project_id={project_id}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageProject;
