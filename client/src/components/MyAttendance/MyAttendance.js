import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Choose a theme you prefer
import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import MyDatePicker from "./MyDatePicker";
import Calender from "./Calender";
import { useSelector } from "react-redux";
import { BarChart } from '@mui/x-charts/BarChart';


const MyAttendance = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  useEffect(() => {
    document.title = "My Attendance";
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
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} >
            <Grid item xs={12}  lg={5}>
              <Paper sx={{padding:3}}>
<Calender emp_id={userInfo.emp_id} manager_id={userInfo.manager_id} />
</Paper>
</Grid>
<Grid item xs={12} lg={7}>
<BarChart
  xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
  series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
  width={500}
  height={300}
/>
</Grid>
          
          </Grid>
          </Container>
          {/* <MyDatePicker/> */}
      </Box>
  );
};

export default MyAttendance;
