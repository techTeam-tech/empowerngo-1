import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button
} from "@mui/material";
import { retrieveNGOList } from "../../api/masterApi";
import EditNGOForm from "./EditNGOForm";  // Import the Edit Form component

const ManageNGOTable = () => {
  const [ngoList, setNgoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedNGOId, setSelectedNGOId] = useState(null);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        setLoading(true);
        const response = await retrieveNGOList("list");
        console.log("NGO API Response:", response); 
        if (response?.payload && Array.isArray(response.payload)) {
          setNgoList(response.payload);
        } else {
          setNgoList([]); 
        }
      } catch (err) {
        setError("Failed to fetch NGO data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  const filteredNGOs = useMemo(() => {
    return searchTerm
      ? ngoList.filter((ngo) =>
          (ngo.NGO_NAME || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
      : ngoList;
  }, [ngoList, searchTerm]);

  const handleEdit = (ngoId) => {
    console.log("Selected NGO ID:", ngoId);  // Debugging log
    setSelectedNGOId(ngoId);  // Ensure correct ID is stored
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedNGOId(null);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="mt-6 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">NGO List</h2>

      {loading && <p>Loading NGOs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex items-center gap-2 mb-4">
        <TextField
          label="Search by name..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSearchTerm("")}
          disabled={!searchTerm}
        >
          Clear
        </Button>
      </div>
      <TableContainer sx={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table sx={{ minWidth: "150px" }}>
          <TableHead>
            <TableRow>
              <TableCell><b>NGO Name</b></TableCell>
              <TableCell><b>Registration Number</b></TableCell>
              <TableCell><b>City</b></TableCell>
              <TableCell><b>State</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Contact</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNGOs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No NGOs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredNGOs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ngo) => (
                <TableRow key={ngo.NGO_ID}>
                  <TableCell>{ngo.NGO_NAME}</TableCell>
                  <TableCell>{ngo.NGO_REG_NUMBER}</TableCell>
                  <TableCell>{ngo.NGO_CITY}</TableCell>
                  <TableCell>{ngo.NGO_STATE}</TableCell>
                  <TableCell>{ngo.NGO_EMAIL}</TableCell>
                  <TableCell>{ngo.NGO_CONTACT}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(ngo.NGO_ID)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredNGOs.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Render Edit NGO Form */}
      {editOpen && (
        <EditNGOForm open={editOpen} onClose={handleEditClose} ngoId={selectedNGOId} />
      )}
    </Paper>
  );
};

export default ManageNGOTable;
