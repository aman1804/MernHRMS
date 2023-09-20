import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Card,
  CircularProgress,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddress } from "../../../actions/employeeAction";
import { Button } from "@mui/material";

const states=[
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];
const countries=["India"]
const ContactDetails = ({emp_id}) => {
  // const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  // const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  // const [emp_id, setEmp_id] = useState("");
  const [alertInfo, setAlertInfo] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const dispatch = useDispatch();
  
  const { loading, address, error } = useSelector(
    (state) => state.employeeAddress
  );
  useEffect(() => {
    dispatch(getAddress(emp_id));
  }, [dispatch]);

  useEffect(() => {
    if (address)
    {
      setStreet(address.street);
      setLocality(address.locality);
      setPinCode(address.pincode);
      setSelectedCountry(address.country);
      setSelectedState(address.state);
      setSelectedCity(address.city);
      
    }
  }, [address])
  
  const handleSubmit = async (e) => {
    setAlertInfo(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const street = formData.get("street");
    try {
      dispatch(
        addAddress({
          street: street,
          locality: locality,
          pincode: pinCode,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
          emp_id: emp_id,
        })
      );
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

 

  
  return (
    <>
      <CssBaseline />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          
          paddingTop:0,
          borderRadius: 1,
          boxShadow: 1,
          marginBottom: 2,
        }}
      >
        {loading && <LinearProgress
        sx={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          // marginX: 0.25,
        }}
         disableShrink />}
         
        <Paper sx={{padding: 3,}}>

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

            {address && (
              <Alert
                severity="success"
                onClose={() => setAlertInfo(false)}
                sx={{ width: "100%", marginBottom: 2 , }}
              >
                <AlertTitle>Success</AlertTitle>
                Profile Updated Successfully
              </Alert>
            )}
          </>
        )}
<Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                Address Details
              </Typography>
        <Grid container spacing={2} textAlign={"start"}>
          

              
             
          <Grid item xs={12} sm={6}>
                  <TextField
                    label="Street"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={street}
                    
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Locality"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={locality}
                    
                    onChange={(e) => setLocality(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pin Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={pinCode}
                    
                    
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Country"
                    id="country"
                    value={selectedCountry}
                    onChange={(e)=>setSelectedCountry(e.target.value)}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {countries.map((country) => (
                      <MenuItem value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="State"
                    id="state"
                    value={selectedState}
                    onChange={(e)=>setSelectedState(e.target.value)}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {states.map((state) => (
                      <MenuItem value={state}>{state}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    id="city"
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                    size="small"
                    variant="outlined"
                  >
                    
                  </TextField>
                </Grid>
              </Grid>
              {/* ... Other fields ... */}
              
            
          <Grid item xs={12} textAlign={"center"} mt={2}>
            <Button
            type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {"Save"}
            </Button>
          </Grid>
            
          </Paper>
      </Box>
    </>
  );
};

export default ContactDetails;
