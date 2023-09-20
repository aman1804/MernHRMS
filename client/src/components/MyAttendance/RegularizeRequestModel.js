import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSuccess,
  updateAttendanceRequestApproval,
} from "../../actions/attendancerequestApprovalAction";

const Item = styled(Paper)(({ theme, color, bgcolor }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.h6,
  padding: theme.spacing(1),
  textAlign: "center",
  color: color ? color : theme.palette.text.secondary,
  backgroundColor: bgcolor, // Use the color prop here
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegularizeRequestModel = ({
  req_id,
  attendance,
  emp_name,
  status,
  remark,
}) => {
  const [open, setOpen] = React.useState(false);
  const [nremark, setNremark] = useState();
  const handleOpen = () => setOpen(true);

  const newDate = attendance.date.split("T");
  useEffect(() => {
    setNremark(remark);
  }, [remark]);

  const dispatch = useDispatch();
  const { loading, error, data, success } = useSelector(
    (state) => state.attendanceRequestApproval
  );

  const handleApproveReject = (status) => {
    // Implement your logic for approving the request here
    dispatch(updateAttendanceRequestApproval(req_id, status, nremark));
    console.log(`Approve action clicked for row with ID: ${status}`);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetSuccess());
  };
  console.log(attendance);
  return (
    <>
      <Button size="small" variant="contained" onClick={handleOpen}>
        View Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {emp_name}
          </Typography>
          {loading ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress size={50} disableShrink />
            </div>
          ) : (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                  </Alert>
                )}
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {attendance.is_present ? (
                  <Item bgcolor="#2e7d32" color="#fff">
                    Present
                  </Item>
                ) : (
                  <Item bgcolor="#d32f2f" color="#fff">
                    Not Present
                  </Item>
                )}
              </Grid>
              <Grid item xs={12}>
                <Item>{newDate[0]}</Item>
              </Grid>
              <Grid item xs={12}>
                <Item>Start Time {attendance.start_time}</Item>
              </Grid>
              <Grid item xs={12}>
                <Item>End Time {attendance.end_time}</Item>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Remark"
                  label="Remark"
                  variant="outlined"
                  value={nremark}
                  InputProps={{
                    readOnly: status !== "pending" && true,
                  }}
                  onChange={(e) => setNremark(e.target.value)}
                />
              </Grid>

              {status === "pending" && (
                <>
                  <Grid item xs={6} textAlign={"end"}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleApproveReject("rejected")}
                    >
                      Reject
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApproveReject("approved")}
                    >
                      Approve
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RegularizeRequestModel;
