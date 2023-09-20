import { Avatar, Box, Button, Container, LinearProgress, Paper, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveEmployees } from "../../actions/employeeAction";
import { Link as RouterLink } from "react-router-dom";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(fname, lname) {
  const name = fname + " " + lname;
  return {
    sx: {
      bgcolor: stringToColor(name),
      margin: "auto",
      width: 50,
      height: 50,
      fontSize: "o.33rem",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const columns = [
    {
        field: "emp_name",
        headerName: "Employee Name",
        width: 200,
        renderCell: ({ row }) => (
          <Box display="flex" alignItems="center">
            <Avatar {...stringAvatar(row.emp_name)}></Avatar>
            <span style={{ marginLeft: "8px" }}>{row.emp_name}</span>
          </Box>
        ),
      },
      { field: "emp_designation", headerName: "Designation", width: 250 },
  { field: "id", headerName: "ID", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "isAdmin", headerName: "Is Admin", width: 150,
  renderCell: ({ row }) => (
    row.isAdmin ? <CheckIcon color="success" /> : <CloseIcon color="error" />
  ),
},
{ field: "action", headerName: "Action", width: 150,
  renderCell: ({ row }) => (
    <Button component={RouterLink} to={`/emp_data/${row.id}`} state={'jsa'}>view</Button>
  ),
},


];



const CompanyDirectory = () => {
    const { loading, error,activeEmployees } = useSelector(
        (state) => state.employees
      );
      const dispatch=useDispatch()
      useEffect(() => {
        dispatch(fetchActiveEmployees())
      }, [])
      console.log(activeEmployees)
      if(!activeEmployees){
        return <>
        <h1>No data</h1>
        </>
      }
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
            rows={activeEmployees}
            columns={columns}
            pageSize={5}
            columnVisibilityModel={{
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              }}
            disableSelectionOnClick

            slots={{
                loadingOverlay: LinearProgress,
              }}
              loading={loading}
              {...loading}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default CompanyDirectory;
