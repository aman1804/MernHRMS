import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  createEducation,
  deleteEducation,
  fetchAllEducations,
  updateEducation,
} from "../../../actions/educationAction";

const customTheme = createTheme({
  // Your custom theme settings
});

const Education = ({ emp_id }) => {
  const [items, setItems] = useState([]);
  const [action, setAction] = useState("");
  const [alertInfo, setAlertInfo] = useState(false);
  const dispatch = useDispatch();

  const { loading, educations, success, error } = useSelector(
    (state) => state.employeeEducation
  );

  const addItem = () => {
    setItems([
      {
        id: Date.now(),
        qualification: "",
        stream: "",
        institute: "",
        university: "",
        grade: "",
        passing_year: "",
        ic: false,
      },
      ...items,
    ]);
  };

  useEffect(() => {
    dispatch(fetchAllEducations(emp_id));
  }, [dispatch, emp_id]);

  useEffect(() => {
    if (educations) {
      setItems(
        educations.map((edu) => ({
          id: edu._id,
          qualification: edu.qualification,
          stream: edu.stream,
          institute: edu.institute,
          university: edu.university,
          grade: edu.grade,
          passing_year: edu.passing_year,
          ic: true,
        }))
      );
    }
  }, [educations]);

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
    setAlertInfo(true);
    const formData = new FormData(event.currentTarget);
    const qualification = formData.get("qualification");
    const stream = formData.get("stream");
    const institute = formData.get("institute");
    const university = formData.get("university");
    const grade = formData.get("grade");
    const passing_year = formData.get("passing_year");

    if (action === "save") {
      try {
        dispatch(
          createEducation({
            emp_id: emp_id,
            qualification: qualification,
            stream: stream,
            institute: institute,
            university: university,
            grade: grade,
            passing_year: passing_year,
          })
        );
        deleteItem(itemId);
      } catch (err) {
        console.log(err);
      }
    } else if (action === "update") {
      try {
        dispatch(
          updateEducation(
            {
              qualification: qualification,
              stream: stream,
              institute: institute,
              university: university,
              grade: grade,
              passing_year: passing_year,
            },
            itemId
          )
        );
      } catch (err) {
        console.log(err);
      }
    } else if (action === "delete") {
      try {
        dispatch(deleteEducation(itemId));
        deleteItem(itemId);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ marginBottom: 2,  }}>
      
        
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
        {loading ? <CircularProgress disableShrink />:
        <Button
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
          variant="contained"
          onClick={addItem}
        >
          Add Item
        </Button>}
        
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
                  label="Qualification"
                  variant="outlined"
                  fullWidth
                  name="qualification"
                  size="small"
                  value={item.qualification}
                  onChange={(e) =>
                    updateItemField(item.id, "qualification", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Stream"
                  variant="outlined"
                  fullWidth
                  name="stream"
                  size="small"
                  value={item.stream}
                  onChange={(e) =>
                    updateItemField(item.id, "stream", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Institute"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="institute"
                  value={item.institute}
                  onChange={(e) =>
                    updateItemField(item.id, "institute", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="University"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="university"
                  value={item.university}
                  onChange={(e) =>
                    updateItemField(item.id, "university", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Grade"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={item.grade}
                  name="grade"
                  onChange={(e) =>
                    updateItemField(item.id, "grade", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                
                <TextField
                  label="Passing Year"
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  name="passing_year"
                  value={item.passing_year}
                  onChange={(e) =>
                    updateItemField(item.id, "passing_year", e.target.value)
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

export default Education;
