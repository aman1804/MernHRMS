import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import {
  Avatar,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonalDetails from "./components/PersonalDetails";
import PropTypes from "prop-types";
import ContactDetails from "./components/ContactDetails";
import { useSelector } from "react-redux";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from "axios";
import AddExperiences from "./components/AddExperiences";
import DynamicComponent from "./components/AddExperiences";
import Experience from "./components/AddExperiences";
import Education from "./components/Education";

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

const theme = createTheme();
function stringAvatar(fname, lname) {
  const name = fname + " " + lname;
  return {
    sx: {
      bgcolor: stringToColor(name),
      margin: "auto",
      width: 100,
      height: 100,
      fontSize: "3rem",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const MyProfile = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 
  console.log(userInfo);
  useEffect(() => {
    document.title = "Profile";
  }, [userInfo]);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
          <Grid container spacing={3} textAlign={'center'}>
            <Grid item xs={12}  lg={4}>
              <Card sx={{mb:4}}   >
                <CardContent >
                  {/* <img
                    src="http://127.0.0.1:9000/images/mylogo.png"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  /> */}
                  <Avatar
                    {...stringAvatar(userInfo.first_name, userInfo.last_name)}
                  ></Avatar>
                  <Typography variant="h5" >
                    {userInfo.first_name + " " + userInfo.last_name}
                  </Typography>
                  <Typography variant="body1" >
                    {userInfo.designation}
                  </Typography>
                  <Typography variant="body1" >
                    Bay Area, San Francisco, CA
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    marginTop={2}
                  >
                    <Button variant="contained" color="primary">
                      Follow
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ marginLeft: 1 }}
                    >
                      Message
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
              <Card className="mb-4 mb-lg-0">
                <CardContent className="p-0">
                  <Typography>Hello</Typography>
                  <ul className="list-group list-group-flush rounded-3">
                    {/* List items */}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
              >
                <Tab label="Personal" {...a11yProps(0)} />
                <Tab label="Contact" {...a11yProps(1)} />
                <Tab label="Experience" {...a11yProps(2)} />
                <Tab label="Education" {...a11yProps(3)} />
              </Tabs>
              <Box overflow={"auto"}>
                <CustomTabPanel value={value} index={0}>
                  <PersonalDetails />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <ContactDetails emp_id={userInfo.emp_id}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <Experience emp_id={userInfo.emp_id}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <Education emp_id={userInfo.emp_id} />
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
