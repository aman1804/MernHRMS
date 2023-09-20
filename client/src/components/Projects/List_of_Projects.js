// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../actions/projectActions";
import React, { useEffect, useState } from "react";
import { SearchRounded } from "@mui/icons-material";
function createData(id, name, calories, fat, carbs, protein) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
];

export default function AccessibleTable({ userInfo,setProject_id }) {
  const [search, setSearch] = useState("");
  const [isPro, setIsPro] = useState(false);
  const { loading, error, projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo)
    {
        dispatch(getAllProjects(userInfo.emp_id));
    }
  }, [userInfo]);

  // Filter projects based on the search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(() => {
    if (!isPro && filteredProjects.length > 0) {
      setProject_id(filteredProjects[0]._id);
      setIsPro(true)
    }
  }, [filteredProjects]);
  
  return (
    <div>
      
      <TableContainer component={Paper} sx={{height:'78vh'}}>
      <TextField
      size="small"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><SearchRounded/></InputAdornment>
          ),
        }}
      />
        <Table stickyHeader aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project._id}>
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => setProject_id(project._id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
