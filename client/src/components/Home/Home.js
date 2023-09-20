import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Box,
} from "@mui/material";
import Clock from "./Clock";
import Attendance from "./components/Attendance";
import Projects from "./components/Projects";
import Leave from "./components/Leave";
import { useSelector } from "react-redux";
// import { PieChart } from "@mui/x-charts";


const MyComponent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 
  console.log(userInfo);
  useEffect(() => {
    document.title = "Home";
  }, [userInfo]);
  
  
  return (
    <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          
   
      <Card variant="outlined" sx={{ }}>
        <CardHeader
          sx={{ backgroundColor: "primary.main", color: "white" }}
          title={<Clock />}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="stretch">
        <Attendance emp_id={userInfo.emp_id}/>   

            <Projects userInfo={userInfo}/>
            <Leave/>
          </Grid>
        </CardContent>
      </Card>
      
    </Container>
    </Box>
  );
};

export default MyComponent;
