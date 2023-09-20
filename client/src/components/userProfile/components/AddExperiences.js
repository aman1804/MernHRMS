import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ExperienceDetails from "./ExperienceDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  createExperience,
  deleteExperience,
  fetchAllExperiences,
  updateExperience,
} from "../../../actions/experienceAction";

const customTheme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#007bff", // Your primary color
  //   },
  //   secondary: {
  //     main: "#ff5722", // Your secondary color
  //   },
  // },
  // typography: {
  //   fontFamily: "Arial, sans-serif",
  // },
});
const Experience = ({ emp_id }) => {
  const [items, setItems] = useState([]);
  const [action, setAction] = useState("");
  const [alertInfo, setAlertInfo] = useState(false);
  const dispatch = useDispatch();


  const { loading, experiences, success, error } = useSelector(
    (state) => state.employeeExperience
  );

  const addItem = () => {
    setItems([
      {
        id: Date.now(),
        job_title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: "",
        skills: "",
        ic: false,
      },
      ...items,
    ]);
  };

  useEffect(() => {
    // Assuming fetchAllExperiences fetches experiences for the given emp_id
    dispatch(fetchAllExperiences(emp_id));
  }, [dispatch, emp_id]);

  useEffect(() => {
    if (experiences) {
      // Check if experiences is defined
      setItems(
        experiences.map((exp) => ({
          id: exp._id,
          job_title: exp.job_title,
          company: exp.company,
          start_date: exp.start_date,
          end_date: exp.end_date,
          description: exp.description,
          skills: exp.skills,
          ic: true,
        }))
      );
    }
  }, [experiences]);

  // setItems([
  //   {
  //     id: Date.now(),
  //     jobTitle: experiences.job_title,
  //     company: experiences.company,
  //     start_date: experiences.start_date,
  //     end_date: experiences.end_date,
  //     job_description: experiences.job_description,
  //     skills: experiences.skills,
  //     ic: true,
  //   },
  //   ...items,
  // ])

  const deleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateItemField = (itemId, field, value) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };
  const handleSubmit = (itemId) => (event) => {
    event.preventDefault();
    console.log(itemId);
    setAlertInfo(true);
    const formData = new FormData(event.currentTarget);
    const job_title = formData.get("job_title");
    const company = formData.get("company");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const description = formData.get("description");
    const skills = formData.get("skills");
    if (action == "save") {
      console.log("create");
      try {
        dispatch(
          createExperience({
            emp_id: emp_id,
            job_title: job_title,
            company: company,
            start_date: start_date,
            end_date: end_date,
            description: description,
            skills: skills,
          })
        );
        deleteItem(itemId);
      } catch (err) {
        console.log(err);
      }
      console.log(job_title);
    } else if (action == "update") {
      console.log("update");
      try {
        dispatch(
          updateExperience(
            {
              job_title: job_title,
              company: company,
              start_date: start_date,
              end_date: end_date,
              description: description,
              skills: skills,
            },
            itemId
          )
        );
      } catch (err) {
        console.log(err);
      }
      console.log(job_title);
    } else if (action == "delete") {
      console.log("delete");
      try {
        dispatch(deleteExperience(itemId));
        deleteItem(itemId);
      } catch (err) {
        console.log(err);
      }
      console.log(job_title);
    }
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ marginBottom: 2 }}>
        {alertInfo && (
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
        )}
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <Button
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
            variant="contained"
            onClick={addItem}
          >
            Add Item
          </Button>
        )}
        {items.map((item) => (
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
              <Grid item xs={12} textAlign={"end"}>
                {item.ic ? (
                  <Button
                    variant="contained"
                    color="error"
                    type="submit"
                    onClick={() => setAction("delete")}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button color="error" onClick={() => deleteItem(item.id)}>
                    <CloseIcon />
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  name="job_title"
                  size="small"
                  value={item.job_title}
                  onChange={(e) =>
                    updateItemField(item.id, "job_title", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company"
                  variant="outlined"
                  fullWidth
                  name="company"
                  size="small"
                  value={item.company}
                  onChange={(e) =>
                    updateItemField(item.id, "company", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="date"
                  name="start_date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={item.start_date.split("T")[0]}
                  onChange={(e) =>
                    updateItemField(item.id, "start_date", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="date"
                  name="end_date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={item.end_date.split("T")[0]}
                  onChange={(e) =>
                    updateItemField(item.id, "end_date", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Description"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="description"
                  value={item.description}
                  onChange={(e) =>
                    updateItemField(item.id, "description", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Skills"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={item.skills}
                  name="skills"
                  onChange={(e) =>
                    updateItemField(item.id, "skills", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
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
      </Box>
    </ThemeProvider>
  );
};

export default Experience;
