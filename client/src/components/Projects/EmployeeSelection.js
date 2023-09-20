import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesUnderManager } from "../../actions/employeeAction";

// Sample data for employees
const employeesa = [
  { empid: 1, name: "John Doe", email: "john@example.com" },
  { empid: 2, name: "Jane Smith", email: "jane@example.com" },
  // Add more employees here
];

const EmployeeSelection = ({ userInfo,defaultTeam ,onTeamChange,options}) => {
//   const dispatch = useDispatch();
//   const { loading, error, employees } = useSelector((state) => state.employees);
//   const defaultEmployee = employees.find(
//     (employee) => employee.empId === "64e0d01a427d401ab32052e9"
//   );
//   const defaultEmpIds = ["64e0d01a427d401ab32052e9", "64ec2d08ae20494aa898c0ce"]; // Change this to your desired empIds

//   // Find the employee objects based on empIds
//   const defaultEmployees = employees.filter((employee) => defaultTeam.includes(employee.empId));

//   const [value, setValue] = useState([]);
//   const [options, setOptions] = useState([]);
//   useEffect(() => {
//     dispatch(fetchEmployeesUnderManager(userInfo.emp_id));
//     if (employees) {
//       setOptions(employees);

//       console.log(employees);
//     } else {
//       console.log(error);
//     }
//   }, [userInfo, dispatch]);

  
 

  return (
    <Autocomplete
      multiple
      id="employee-selection"
      name="selectedTeam" 
      value={defaultTeam}
      onChange={(event, newValue) => {
        onTeamChange(newValue);
      }}
      options={options}
      getOptionLabel={(option) => `${option.empName} (${option.userEmail})`} // Customize the label
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.empName} // Display name in the chip
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
        
          {...params}
          label="Select Employees"
          placeholder="Search employees"
        />
      )}
    />
  );
};

export default EmployeeSelection;
