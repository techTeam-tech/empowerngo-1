import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getDonorData } from "../../api/masterApi";
import { formatDistanceToNow } from "date-fns";
const formatTimestamp = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const RenderField = ({ label, value }) => {
  if (!value) return null;
  return (
    <Typography variant="body1">
      <b>{label}:</b> {value}
    </Typography>
  );
};
const ViewDonor = ({ open, onClose, ngoId }) => {
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNGOData = useMemo(() => {
    return async () => {
      if (ngoId) {
        try {
          setLoading(true);
          const response = await retrieveNGOList("info", ngoId);
          if (response?.payload) {
            setNgo(response.payload);
          } else {
            setError("NGO not found");
          }
        } catch (err) {
          setError("Failed to fetch NGO data");
        } finally {
          setLoading(false);
        }
      }
    };
  }, [ngoId]);

  useEffect(() => {
    fetchNGOData();
  }, [fetchNGOData]);

  const handleClose = () => {
    onClose();
    setNgo(null);
    setError(null);
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Loading NGO Details...</DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "200px" }}
          >
            <CircularProgress />
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (!ngo) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="primary" fontWeight="bold">
            NGO Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Paper sx={{ p: 2, borderRadius: "10px", boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#1976d2", fontWeight: "bold", mb: 2 }}
            >
              Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <RenderField label="Name" value={ngo.DONOR_FNAME} />
                <RenderField label="City" value={ngo.DONOR_MNAME} />
                <RenderField label="State" value={ngo.DONOR_LNAME} />
                <RenderField label="Country" value={ngo.DONOR_EMAIL} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RenderField
                  label="Registration Number"
                  value={ngo.DONOR_MOBILE}
                />
                <RenderField label="Pincode" value={ngo.DONOR_PAN} />
                <RenderField label="Email" value={ngo.DONOR_TYPE} />
                <RenderField label="Contact" value={ngo.NGO_NAME} />
              </Grid>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Typography
                variant="h6"
                sx={{ color: "#1976d2", fontWeight: "bold", mb: 2 }}
              >
                Timestamps
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {ngo.CREATED_AT && (
                    <Typography variant="body1">
                      <b>Created At:</b> {formatTimestamp(ngo.CREATED_AT)}
                    </Typography>
                  )}
                  {ngo.UPDATED_AT && (
                    <Typography variant="body1">
                      <b>Updated At:</b> {formatTimestamp(ngo.UPDATED_AT)}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDonor;
