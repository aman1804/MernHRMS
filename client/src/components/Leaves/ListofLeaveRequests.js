import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Toolbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ListofLeaveRequests = ({ userInfo, setLeaveRequestId,fetchLeaveRequests,columns,tableHeight }) => {
  const {
    loading,
    error,
    leaveRequests,
    applyLeaveMessage,
    applyLeaveLoading,
    applyLeaveError,
    approveLeaveMessage,
    approveLeaveError,
  } = useSelector((state) => state.leave);

  const columns1 = [
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


 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaveRequests(userInfo.emp_id));
  }, [dispatch, userInfo, applyLeaveMessage, applyLeaveError,approveLeaveMessage,approveLeaveError,]);

  useEffect(() => {
    // Check if there are leaveRequests and set the Leave Request ID to the first row's ID by default
    if (leaveRequests.length > 0) {
      setLeaveRequestId(leaveRequests[0].id);
    }
  }, [leaveRequests, setLeaveRequestId]);

  console.log(leaveRequests);
  return (
    <Paper style={{ height:tableHeight, width: "100%" }}>
      <DataGrid
        rows={leaveRequests}
        columns={columns}
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          id: false,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          sorting: {
            sortModel: [{ field: "request_date", sort: "desc" }],
          },
        }}
        // filterModel={filterModel}
        // onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}

        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        {...loading}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
};

export default ListofLeaveRequests;
