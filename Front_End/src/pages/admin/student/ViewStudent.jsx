import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
  Alert,
} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import AddStudent from './AddStudent';
import { getAllStudentDetails } from "../../../redux/action/Student";

const ViewStudent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [nameselect, setNameselect] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    if (
      event.key === "Enter" ||
      (event.keyCode === 32 && event.target.selectionStart === 0)
    ) {
      event.preventDefault();
    }
    setNameselect(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllStudentDetails((res, err) => {
      if (res.statusCode===200) {
        setStudentList(res.data);
      } else {
        showSnackbar(err ? err.message : 'An error occurred while fetching student details.');
      }
    }));
  }, [dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showSnackbar = (msg) => {
    setOpen(true);
    setSnackbarMessage(msg);
  };

  const handleKeyPress = (event) => {
    // Implement key press functionality
  };


  const columns = [
    { id: 'sno', label: 'S.no' },
    { id: 'rollNumber', label: 'Roll Number' },
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'gender', label: 'Gender', minWidth: 50 },
    { id: 'class', label: 'Class', minWidth: 50 },
    { id: 'section', label: 'Section', minWidth: 50 },
    { id: 'email', label: 'Email', minWidth: 50 }
  ];

  const displayedRows = Array.isArray(studentList)
  ? studentList.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  : [];
  return (
    <Box
      sx={{
        mx: 4,
        mt: 10,
        backgroundColor: "white",
        border: "1px solid rgba(54, 49, 87, 0.12)",
        borderRadius: "6px",
      }}
    >
      <Box
        sx={{
          paddingLeft: "24px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "59px",
          paddingRight: "12px",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
        }}
      >
        <span style={{ fontSize: "500", fontWeight: "14px" }}>
          Student Record Details
        </span>
        <Box>
          <Button
            onClick={() => setDialogOpen(true)} // Open the dialog
            variant="contained"
            startIcon={<AddCircleOutlinedIcon />}
            sx={{
              backgroundColor: "#8a7df7",
              '&:hover': {
                backgroundColor: "#a389f4",
              },
            }}
          >
            ADD STUDENT
          </Button>
        </Box>
      </Box>
      <Divider />
      <Grid container justifyContent={"space-between"}>
        <Grid
          item
          xs={4.5}
          display={"flex"}
          sx={{ height: "100%" }}
          alignItems={"center"}
        >
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              mx: 2,
              border: "1px solid #ECEBEB",
              boxShadow: "none",
            }}
            onChange={handleSearch}
            onKeyDown={(event) => handleKeyPress(event)}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              style={{
                fontSize: "14px",
                fontWeight: "400",
              }}
              placeholder="Search name..."
              value={nameselect}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Divider orientation="vertical" sx={{ height: "72px" }} />
        </Grid>
      </Grid>

      <TableContainer component={Paper}
        sx={{
          borderBottomLeftRadius: "6px",
          borderBottomRightRadius: "6px",
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#a389f4" }}>
              {columns.map((column) => (
                <TableCell
                  align="center"
                  component="th"
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  scope="row"
                  sx={{ color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.rollNumber}>
                <TableCell align="center">
                  {index + 1}
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.rollNumber}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                   {`${row.firstName}  ${row.lastName}`}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.gender}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.className}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.sectionName}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => console.log('Edit student', row)}
                  >
                    <EditIcon
                      fontSize="small"
                      style={{ color: "#6f5ad7" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Pagination
            count={Math.ceil(studentList.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            sx={{ fontWeight: 600 }}
            onClose={handleClose}
            severity="error"
            variant="filled"
          >
            {snackbarMessage}.
          </Alert>
        </Snackbar>
      </TableContainer>

      <AddStudent isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} /> 
    </Box>
  );
};

export default ViewStudent;
