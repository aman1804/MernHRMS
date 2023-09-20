import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  ListItem,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../actions/projectActions";

const Projects = ({ userInfo }) => {
  const { loading, error, projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      dispatch(getAllProjects(userInfo.emp_id));
    }
  }, [userInfo]);
  // const projects = [{id: 1, ProjectName: "Project A" }, {id: 2, ProjectName: "Project B" }];

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined">
          <CardHeader
            sx={{ backgroundColor: "primary.main", color: "white", p: 1 }}
            title={"Projects"}
          />
          <CardContent>
            {loading ? (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress size={30} disableShrink />
              </div>
            ) : (
              <Stack>
                {projects.map((project) => (
                  <ListItem key={project._id}>{project.name}</ListItem>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Projects;
