import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAttendanceRequestLists } from "../../actions/attendancerequestApprovalAction";
import RegularizeRequestModel from "./RegularizeRequestModel";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "emp_name", headerName: "Employee Name", width: 130 },
  { field: "emp_designation", headerName: "Designation", width: 130 },
  {
    field: "request_date",
    headerName: "Date",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: ({ row }) => (
      <>
        <RegularizeRequestModel
          req_id={row.id}
          attendance={row.attendance_id}
          emp_name={row.emp_name}
          status={row.status}
          remark={row.remark}
        />
      </>
    ),
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Attendance_Requests() {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, data, success } = useSelector(
    (state) => state.attendanceRequestApproval
  );

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        field: 'status',
        value: 'pending',
      },
    ],
  });
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttendanceRequestLists(userInfo.emp_id));
  }, [dispatch, userInfo,success]);

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
        <Paper style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
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
                sortModel: [{ field: 'request_date', sort: 'desc' }],
              },
              
            }}
            filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
            y
            slots={{
              loadingOverlay: LinearProgress,
            }}
            loading={loading}
            {...loading}
            pageSizeOptions={[5, 10]}
          />
        </Paper>
      </Container>
    </Box>
  );
}
