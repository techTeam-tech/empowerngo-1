import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { retrieveNGOList } from "../../api/masterApi";
import { registerNgo } from "../../api/masterApi";

const EditNGOForm = ({ open, onClose, ngoId }) => {
  const [ngoDetails, setNgoDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  useEffect(() => {
    if (ngoId) {
      setLoading(true);
      retrieveNGOList("info", ngoId)
        .then((response) => {
          if (response?.payload) {
            setNgoDetails(response.payload);
            setLogoPreview(response.payload.LOGO_URL);
            setSignaturePreview(response.payload.SIGNATURE_URL);
          }
        })
        .catch((error) => console.error("Error fetching NGO details:", error))
        .finally(() => setLoading(false));
    }
  }, [ngoId]);

  const handleChange = (e) => {
    setNgoDetails({ ...ngoDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setNgoDetails({ ...ngoDetails, [field]: file });
      const reader = new FileReader();
      reader.onload = () => {
        if (field === "LOGO_URL") {
          setLogoPreview(reader.result);
        } else if (field === "SIGNATURE_URL") {
          setSignaturePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
  
      // Check if ngoName exists before sending the request
      if (!ngoDetails.ngoName || ngoDetails.ngoName.trim() === "") {
        alert("Error: NGO Name is required.");
        return;
      }
  
      // Append all NGO details
      Object.keys(ngoDetails).forEach((key) => {
        if (ngoDetails[key]) {
          formData.append(key, ngoDetails[key]);
        }
      });
  
      // Append `reqType` (Ensure correct case)
      formData.append("reqType", "s");
  
      console.log("Saving NGO details:", Object.fromEntries(formData.entries()));
  
      const response = await registerNgo(formData);
      console.log("Save response:", response);
  
      if (response?.status === "FAILURE") {
        alert(`Error: ${response.message}`);
      } else {
        alert("NGO details saved successfully!");
        onClose(); // Close the dialog after saving
      }
    } catch (error) {
      console.error("Error saving NGO details:", error);
      alert("Failed to save NGO details.");
    }
  };
  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit NGO Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField label="NGO Name" name="ngoName" value={ngoDetails.NGO_NAME || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Address" name="ngoAddress" value={ngoDetails.NGO_ADDRESS || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="City" name="ngoCity" value={ngoDetails.NGO_CITY || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="State" name="ngoState" value={ngoDetails.NGO_STATE || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Country" name="ngoCountry" value={ngoDetails.NGO_COUNTRY || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Pincode" name="ngoPinCode" value={ngoDetails.NGO_PINCODE || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" name="ngoEmail" value={ngoDetails.NGO_EMAIL || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Contact" name="ngoContact" value={ngoDetails.NGO_CONTACT || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Authorized Person" name="authorizedPerson" value={ngoDetails.AUTHORIZED_PERSON || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="80G Number" name="ngo80GNumber" value={ngoDetails.NGO_80G_NUMBER || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="12A Number" name="ngo12ANumber" value={ngoDetails.NGO_12A_NUMBER || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="CSR Number" name="ngoCSRNumber" value={ngoDetails.NGO_CSR_NUMBER || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="FCRA Number" name="ngoFCRANumber" value={ngoDetails.NGO_FCRA_NUMBER || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="PAN" name="ngoPAN" value={ngoDetails.NGO_PAN || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Contact Person" name="contactPerson" value={ngoDetails.CONTACT_PERSON || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Registration Number" name="ngoRegNumber" value={ngoDetails.NGO_REG_NUMBER || ""} onChange={handleChange} fullWidth margin="dense" />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">NGO Logo</Typography>
              {logoPreview && <img src={logoPreview} alt="logoURL" style={{ width: "100%", maxHeight: 150, objectFit: "contain", borderRadius: 5 }} />}
              <Button variant="contained" component="label" fullWidth style={{ marginTop: 10 }}>
                Update Logo
                <input type="file"name="logoURL" hidden onChange={(e) => handleImageChange(e, "LOGO_URL")} />
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">NGO Signature</Typography>
              {signaturePreview && <img src={signaturePreview} alt="Signature" style={{ width: "100%", maxHeight: 150, objectFit: "contain", borderRadius: 5 }} />}
              <Button variant="contained" component="label" fullWidth style={{ marginTop: 10 }}>
                Update Signature
                <input type="file" name="signatureURL" hidden onChange={(e) => handleImageChange(e, "SIGNATURE_URL")} />
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNGOForm;
