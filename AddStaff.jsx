import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { registerUser } from "../../api/masterApi";

const EditUserForm = ({ open, onClose, userId, editStaff }) => {
  const [status, setStatus] = useState("ACTIVE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editStaff) {
      setStatus(editStaff.status);
    }
  }, [editStaff]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await manageUserRegistration({
        reqType: "u",
        userID: userId,
        status,
      });
      
      if (response?.status === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: editStaff ? "Staff Updated" : "Staff Added",
          text: editStaff
            ? "Staff details updated successfully!"
            : "Staff has been successfully added!",
        });
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error updating staff details:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update staff details.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User Status</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="dense"
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserForm;