import { Box, Button, Container, Grid, Toolbar } from "@mui/material";
import React, { useState } from "react";
import ApplyLeave from "./ApplyLeave";
import ListofLeaveRequests from "./ListofLeaveRequests";
import LeaveDetails from "./LeaveDetails";
import { fetchLeaveRequestsforEmployee } from "../../actions/leaveAction";

const Leaves = ({ userInfo }) => {
  const tableHeight = "41vh";
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "request_date",
      headerName: "Requested Date",
      type: "date",
      width: 150,
      valueGetter: (params) => {
        // Transform the value into a Date object
        return new Date(params.value);
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      width: 100,
      valueGetter: (params) => {
        // Transform the value into a Date object
        return new Date(params.value);
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "date",
      width: 100,
      valueGetter: (params) => {
        // Transform the value into a Date object
        return new Date(params.value);
      },
    },
    {
      field: "days",
      headerName: "Total Days",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => (
        <>
          <Button
            onClick={() => setLeaveRequestId(row.id)}
            size="small"
            variant="contained"
          >
            view Details
          </Button>
        </>
      ),
    },
  ];
  const [leaveRequestId, setLeaveRequestId] = useState();
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
        <Grid container spacing={3} textAlign={"center"} alignItems="stretch">
          <Grid item xs={12} lg={4} sx={{ height: "100%" }}>
            <ApplyLeave userInfo={userInfo} />
          </Grid>
          <Grid item xs={12} lg={8} sx={{ height: "100%" }}>
            <ListofLeaveRequests
              setLeaveRequestId={setLeaveRequestId}
              tableHeight={tableHeight}
              columns={columns}
              fetchLeaveRequests={fetchLeaveRequestsforEmployee}
              userInfo={userInfo}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2} textAlign={"center"}>
          <Grid item xs={12}>
            <LeaveDetails leaveRequestId={leaveRequestId} userInfo={userInfo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Leaves;
