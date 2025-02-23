/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";
import { getDonorData, handleDonorRequest } from "../../api/masterApi";
import Swal from "sweetalert2";
import {donorTypes} from "../../utils/constants";

const DonorTable = () => {
  const [donorList, setDonorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  // const donorTypes = ["Individual", "Corporate", "Group", "NGO"];

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await getDonorData({}, "list");
      if (response && Array.isArray(response.payload)) {
        setDonorList(response.payload);
      } 
    } catch (error) {
      throw new Error(error)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleEdit = useCallback((donor) => {
    setSelectedDonor({ ...donor });
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setViewOpen(false);
    setSelectedDonor(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDonor((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateDonor = async () => {
    if (!selectedDonor || !selectedDonor.donorID) {
      Swal.fire(
        "Error",
        "Donor ID is required for updating donor details.",
        "error"
      );
      return;
    }
    const userData = localStorage.getItem("user");
    if (!userData) {
      Swal.fire("Error", "No user data found in localStorage.", "error");
      return;
    }
    let parsedData;
    try {
      parsedData = JSON.parse(userData);
    } catch (error) {
      Swal.fire("Error", "Failed to parse user data.", "error", error);
      return;
    }
    const { createdAt, ...updatedDonorData } = selectedDonor;
    const updatedDonor = {
      ...updatedDonorData,
      donorNGOID: parsedData.NGO_ID
    };
    try {
      setModalLoading(true);
      const response = await handleDonorRequest(updatedDonor, "u");
      await fetchDonors();
      handleClose();

      Swal.fire("Success", "Donor details updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update donor details.", "error",error);
    }
    setModalLoading(false);
  };

  const handleView = async (donorID) => {
    setModalLoading(true);
    try {
      const response = await getDonorData({ donorID }, "info");
      if (response && response.payload) {
        setSelectedDonor(response.payload);
        setViewOpen(true);
      }
    } catch (error) {
      throw new Error(error);
    }
    setModalLoading(false);
  };

  return (
    <Paper className="mt-6 p-6">
      <Typography variant="h4" align="center" gutterBottom>
        Donor List
      </Typography>
      <TextField
        label="Search by Name..."
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Donor Type</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donorList.length > 0 ? (
                donorList.map((donor, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {`${donor.donorFName} ${donor.donorMName || ""} ${
                        donor.donorLName
                      }`}
                    </TableCell>
                    <TableCell align="center">{donor.donorEmail}</TableCell>
                    <TableCell align="center">{donor.donorMobile}</TableCell>
                    <TableCell align="center">{donor.donorType}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleEdit(donor)}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleView(donor.donorID)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Donors Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h5">Edit Donor Details</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedDonor && (
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="First Name"
                    name="donorFName"
                    value={selectedDonor.donorFName || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Middle Name"
                    name="donorMName"
                    value={selectedDonor.donorMName || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Last Name"
                    name="donorLName"
                    value={selectedDonor.donorLName || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Mobile"
                    name="donorMobile"
                    value={selectedDonor.donorMobile || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Pan Number"
                    name="donorPAN"
                    value={selectedDonor.donorPAN || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Email"
                    name="donorEmail"
                    value={selectedDonor.donorEmail || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Donor Type</InputLabel>
                    <Select
                      name="donorType"
                      value={selectedDonor.donorType || ""}
                      onChange={handleChange}
                    >
                      {donorTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {modalLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={updateDonor}
            variant="contained"
            color="primary"
            disabled={modalLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <Dialog open={viewOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Donor Details
        </DialogTitle>
        <DialogContent>
          {modalLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            selectedDonor && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: "#fafafa"
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>Name:</strong>{" "}
                      {`${selectedDonor.donorFName} ${
                        selectedDonor.donorMName || ""
                      } ${selectedDonor.donorLName}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>Mobile:</strong> {selectedDonor.donorMobile}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>Email:</strong> {selectedDonor.donorEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>Donor Type:</strong> {selectedDonor.donorType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>PAN:</strong> {selectedDonor.donorPAN}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>NGO Name:</strong> {selectedDonor.ngoName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", p: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DonorTable;
