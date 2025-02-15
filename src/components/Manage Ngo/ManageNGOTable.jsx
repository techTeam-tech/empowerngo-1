import React, { useState, useMemo } from "react";
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
  Button,
} from "@mui/material";

const ManageNGOTable = ({ ngoList, setEditNGO }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter NGOs based on search term
  const filteredNGOs = useMemo(() => {
    return searchTerm
      ? ngoList.filter((ngo) =>
          ngo.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : ngoList;
  }, [ngoList, searchTerm]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="mt-6 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">NGO List</h2>
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

      {/* Table Container with horizontal scrolling */}
      <TableContainer sx={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table sx={{ minWidth: "1500px" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Ngo Name</b>
              </TableCell>
              <TableCell>
                <b>Registration Number</b>
              </TableCell>
              <TableCell>
                <b>Contact Person</b>
              </TableCell>
              <TableCell>
                <b>Ngo Address</b>
              </TableCell>
              {/* <TableCell><b>City</b></TableCell>
              <TableCell><b>State</b></TableCell>
              <TableCell><b>Country</b></TableCell>
              <TableCell><b>Pin Code </b></TableCell> */}
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Contact</b>
              </TableCell>
              <TableCell>
                <b>PAN Card</b>
              </TableCell>
              {/* <TableCell><b>80G Number </b></TableCell>
              <TableCell><b>12A Number</b></TableCell>
              <TableCell><b>Ngo Logo</b></TableCell>
              <TableCell><b>Signature</b></TableCell>
              <TableCell><b>Authorized Person</b></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNGOs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={16} align="center">
                  No NGOs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredNGOs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ngo, index) => (
                  <TableRow key={index}>
                    <TableCell>{ngo.name}</TableCell>
                    <TableCell>{ngo.email}</TableCell>
                    <TableCell>{ngo.phone}</TableCell>
                    <TableCell>{ngo.role}</TableCell>
                    <TableCell>{ngo.location}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => setEditNGO(ngo)}
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
    </Paper>
  );
};

export default ManageNGOTable;
