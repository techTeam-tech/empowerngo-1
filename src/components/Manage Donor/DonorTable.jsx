import { useState, useMemo, useCallback } from "react";
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
  useTheme,
  useMediaQuery
} from "@mui/material";
import CustomButton from "../CustomButton";

const DonorTable = () => {
  const [donorList, setDonorList] = useState([
    {
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
      pincode: "10001",
      mobile: "+1 234 567 890",
      email: "john.doe@example.com",
      panNumber: "ABCDE1234F",
      profession: "Engineer"
    },
    {
      firstName: "Jane",
      middleName: "A.",
      lastName: "Smith",
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      pincode: "90001",
      mobile: "+1 234 567 891",
      email: "jane.smith@example.com",
      panNumber: "XYZAB9876G",
      profession: "Teacher"
    },
    {
      firstName: "Alex",
      middleName: "",
      lastName: "Johnson",
      address: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      country: "USA",
      pincode: "60601",
      mobile: "+1 234 567 892",
      email: "alex.johnson@example.com",
      panNumber: "LMNOP2345H",
      profession: "Doctor"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const filteredDonors = useMemo(() => {
    return Array.isArray(donorList) && searchTerm
      ? donorList.filter((donor) =>
          `${donor.firstName} ${donor.middleName} ${donor.lastName}`
            .trim()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : donorList;
  }, [donorList, searchTerm]);

  const handleEdit = useCallback((donor) => {
    console.log("Edit donor:", donor);
  }, []);

  const columns = [
    "Name",
    "Address",
    "Mobile",
    "Email",
    "PAN Number",
    "Profession",
    "Actions"
  ];

  return (
    <Paper className="mt-6 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Donor List</h2>
      <div className="flex items-center gap-2 mb-4">
        <TextField
          label="Search by Name..."
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((heading) => (
                <TableCell key={heading}>
                  <b>{heading}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No donors found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDonors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((donor, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {`${donor.firstName} ${donor.middleName} ${donor.lastName}`.trim()}
                    </TableCell>
                    <TableCell>{`${donor.city}, ${donor.address}, ${donor.country} - ${donor.pincode}`}</TableCell>
                    <TableCell>{donor.mobile}</TableCell>
                    <TableCell>{donor.email}</TableCell>
                    <TableCell>{donor.panNumber}</TableCell>
                    <TableCell>{donor.profession}</TableCell>
                    <TableCell>
                      <CustomButton onClick={() => handleEdit(donor)}>
                        Edit
                      </CustomButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredDonors.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default DonorTable;
