import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { GridAddIcon, GridCloseIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeSelection from "./EmployeeSelection";
import { fetchEmployeesUnderManager } from "../../actions/employeeAction";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} from "../../actions/projectActions";

const AddNewProjects = ({ project_id, userInfo }) => {
  const [items, setItems] = useState([]);
  const [action, setAction] = useState("");
  const [alertInfo, setAlertInfo] = useState(false);
  const dispatch = useDispatch();
  const [ev, setEv] = useState(false);
  const [defaultTeam, setDefaultTeam] = useState([]); // Change this to your desired empIds
  const {
    loading: projectLoading,
    project,
    error: projectError,
  } = useSelector((state) => state.projects);
  const {
    loading: employeesLoading,
    error: employeesError,
    employees,
  } = useSelector((state) => state.employees);

  const defaultEmployee = employees.find(
    (employee) => employee.empId === "64e0d01a427d401ab32052e9"
  );
  const defaultEmpIds = [
    "64e0d01a427d401ab32052e9",
    "64ec2d08ae20494aa898c0ce",
  ]; // Change this to your desired empIds

  // Find the employee objects based on empIds
  const defaultEmployees = employees.filter((employee) =>
    defaultTeam.includes(employee.empId)
  );

  const [existsProjects, setExistsProjects] = useState();
  //   const [options, setOptions] = useState([]);
  useEffect(() => {
    dispatch(fetchEmployeesUnderManager(userInfo.emp_id));
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (!items) {
      setEv(false);
    }
  }, [items]);

  useEffect(() => {
    setEv(false);
    if (project_id) {
      dispatch(getProjectById(project_id));
      console.log("in loop");
    }
  }, [project_id]);

  useEffect(() => {
    if (!ev) {
      setItems([]);
    }
  }, [ev]);

  const createExistsProjects = (project) => {
    if (project) {
      setDefaultTeam(project.teamMembers);
      const start_date = project.startDate.split("T");
      const end_date = project.endDate
        ? project.endDate.split("T")
        : project.endDate;
      return {
        id: project._id,
        name: project.name,
        description: project.description,
        startDate: start_date[0],
        endDate: end_date ? end_date[0] : project.endDate,
        team: defaultEmployees,
        status: project.status,
        priority: project.priority,
        ic: true,
      };
    }
    return null; // Return null if project is not defined
  };

  // In your useEffect, use the function to set existsProjects
  useEffect(() => {
    setExistsProjects(createExistsProjects(project));
  }, [project, defaultTeam]);

  console.log(project);

  const addItem = () => {
    if (!ev) {
      setEv(true);
      setItems([
        {
          id: Date.now(),
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          team: [], // Set default team IDs here
          // Add more project-related fields here
          ic: false,
        },
      ]);
    } else {
      setItems([
        {
          id: Date.now(),
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          team: [], // Set default team IDs here
          // Add more project-related fields here
          ic: false,
        },
        ...items,
      ]);
    }
  };

  //   useEffect(() => {
  //     dispatch(fetchAllProjects(emp_id));
  //   }, [dispatch, emp_id]);

  //   useEffect(() => {
  //     if (projects) {
  //       setItems(
  //         projects.map((project) => ({
  //           id: project._id,
  //           name: project.name,
  //           description: project.description,
  //           startDate: project.startDate,
  //           endDate: project.endDate,
  //           // Map more project-related fields here
  //           ic: true,
  //         }))
  //       );
  //     }
  //   }, [projects]);

  const deleteItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);

    // Check if there are no items left in the newItems array
    if (newItems.length === 0) {
      setEv(false);
    }
  };

  const updateExistsProjectField = (field, value) => {
    setExistsProjects((prevExistsProjects) => ({
      ...prevExistsProjects,
      [field]: value,
    }));
  };

  const updateItemField = (itemId, field, value) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleTeamChange = (itemId, team) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, team: team } : item))
    );
  };
  const getItemById = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item; // Returns the item with the matching itemId or undefined if not found
  };
  const handleSubmit = (itemId) => (event) => {
    event.preventDefault();
    setAlertInfo(true);
    if (action === "save") {
      // Extract project-related field values from the form
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const description = formData.get("description");
      const startDate = formData.get("startDate");
      const endDate = formData.get("endDate");
      // Extract more project-related field values as needed
      const selectedTeam = getItemById(itemId);
      const teamMembers = selectedTeam.team.map((employee) => employee.empId);
      // Now you have the selected team IDs in the selectedTeam array
      console.log(
        "Selected Team:",
        selectedTeam.team.map((employee) => employee.empId)
      );

      try {
        dispatch(
          createProject({
            manager: userInfo.emp_id,
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            teamMembers: teamMembers,
            // Send more project-related fields here
          })
        );
        console.log("done");
        // deleteItem(itemId);
      } catch (err) {
        console.log(err);
      }
    } else if (action === "update") {
      const teamMembers = existsProjects.team.map((employee) => employee.empId);
      try {
        console.log(itemId, {
          name: existsProjects.name,
          description: existsProjects,
          startDate: existsProjects.startDate,
          endDate: existsProjects.endDate,
          teamMembers: teamMembers,
          status: existsProjects.status,
          priority: existsProjects.priority,
        });
        dispatch(
          updateProject(itemId, {
            name: existsProjects.name,
            description: existsProjects.description,
            startDate: existsProjects.startDate,
            endDate: existsProjects.endDate,
            teamMembers: teamMembers,
            status: existsProjects.status,
            priority: existsProjects.priority,
          })
        );
        //   updateProject(
        //     {
        //       name: name,
        //       description: description,
        //       startDate: startDate,
        //       endDate: endDate,
        //       // Send more project-related fields here
        //     },
        //     itemId
        //   )
      } catch (err) {
        console.log(err);
      }
    } else if (action === "delete") {
      try {
        dispatch(deleteProject(itemId));
        setExistsProjects(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        {/* {error&& <p>{error}</p>} */}
        {/* {alertInfo && (
            <>
              {error && (
                <Alert
                  severity="error"
                  onClose={() => setAlertInfo(false)}
                  sx={{ width: "100%", marginBottom: 2 }}
                >
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
  
              {success && (
                <Alert
                  severity="success"
                  onClose={() => setAlertInfo(false)}
                  sx={{ width: "100%", marginBottom: 2 }}
                >
                  <AlertTitle>Success</AlertTitle>
                  Updated Successfully
                </Alert>
              )}
            </>
          )} */}
        {/* {loading ? (
            <CircularProgress disableShrink />
          ) : ( */}
        {/* )} */}
        <Button
          startIcon={<GridAddIcon />}
          sx={{ mb: 1 }}
          variant="contained"
          onClick={addItem}
        >
          Add Item
        </Button>

        {projectLoading && (
          <LinearProgress
            sx={{
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              marginX: 0.3,
            }}
          />
        )}

        {ev &&
          items.map((item) => (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(item.id)}
              sx={{
                backgroundColor: "white",
                padding: 3,
                borderRadius: 1,
                boxShadow: 1,
                marginBottom: 2,
              }}
              key={item.id}
            >
              <Grid container spacing={2} textAlign={"start"}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Project Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    size="small"
                    value={item.name}
                    onChange={(e) =>
                      updateItemField(item.id, "name", e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} textAlign={"end"}>
                  <Button color="error" onClick={() => deleteItem(item.id)}>
                    <GridCloseIcon />
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    name="startDate"
                    size="small"
                    value={item.startDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      updateItemField(item.id, "startDate", e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    name="endDate"
                    size="small"
                    value={item.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      updateItemField(item.id, "endDate", e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <EmployeeSelection
                    userInfo={userInfo}
                    defaultTeam={item.team} // Pass default team IDs for each item
                    onTeamChange={(team) => handleTeamChange(item.id, team)} // Handle team change for each item
                    options={employees}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="description"
                    size="small"
                    value={item.description}
                    onChange={(e) =>
                      updateItemField(item.id, "description", e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
                {/* Add more project-related fields here */}
                <Grid item xs={12} textAlign={"end"}>
                  {item.ic ? (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => setAction("update")}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => setAction("save")}
                    >
                      Save
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}

        {!ev && existsProjects && (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(existsProjects.id)}
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 1,
              boxShadow: 1,
              marginBottom: 2,
            }}
            key={existsProjects.id}
          >
            <Grid container spacing={2} textAlign={"start"}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  size="small"
                  value={existsProjects.name}
                  onChange={(e) =>
                    updateExistsProjectField("name", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} textAlign={"end"}>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  onClick={() => setAction("delete")}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Priority"
                  id="priority"
                  name="priority"
                  value={existsProjects.priority}
                  onChange={(e) =>
                    updateExistsProjectField("priority", e.target.value)
                  }
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  id="status"
                  name="status"
                  value={existsProjects.status}
                  onChange={(e) =>
                    updateExistsProjectField("status", e.target.value)
                  }
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  name="startDate"
                  size="small"
                  value={existsProjects.startDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    updateExistsProjectField("startDate", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  name="endDate"
                  size="small"
                  value={existsProjects.endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    updateExistsProjectField("endDate", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <EmployeeSelection
                  userInfo={userInfo}
                  defaultTeam={existsProjects.team} // Pass default team IDs for each item
                  // onTeamChange={(team) => handleTeamChange(existsProjects.id, team)}
                  // Handle team change for each item
                  onTeamChange={(team) =>
                    updateExistsProjectField("team", team)
                  }
                  options={employees}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  name="description"
                  size="small"
                  value={existsProjects.description}
                  onChange={(e) =>
                    updateExistsProjectField("description", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              {/* Add more project-related fields here */}
              <Grid item xs={12} textAlign={"end"}>
                {existsProjects.ic ? (
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={() => setAction("update")}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={() => setAction("save")}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddNewProjects;
