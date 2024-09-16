import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
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
} from '@mui/material';
import { getAllFees } from '../../../redux/action/admin';

const ViewFeesDetails = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [nameselect, setNameselect] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [feeList, setFeeList] = useState([]);
  const [severity, setSeverity] = useState('');

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

  const handleKeyPress = (event) => {
    // Implement key press functionality
  };

  useEffect(() => {
    dispatch(getAllFees((res, err) => {
      if (res.statusCode === 200) {
        const fees = res.data.map((fee) => ({
          rollNumber: fee.rollNumber,
          studentName: `${fee.firstName} ${fee.lastName}`,
          class: fee.className,
          section: fee.sectionName,
          feeName: fee.feeName,
          totalAmount: fee.feeAmount,
          balanceAmount: fee.balanceAmount
        }));
        setFeeList(fees);
      } else {
       //console.log(err);
      }
    }));
  }, [dispatch]);

  const displayedRows = feeList.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const columns = [
    { id: 'sno', label: 'S.no' },
    { id: 'rollNumber', label: 'Roll Number' },
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'class', label: 'Class', minWidth: 50 },
    { id: 'section', label: 'Section', minWidth: 50 },
    {id: 'feeName' ,label: 'Fee Name', minWidth: 50 },
    { id: 'totalAmount', label: 'Total Amount', minWidth: 30 },
    { id: 'balanceAmount', label: 'Balance Amount', minWidth: 30 }
  ];

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
          Student Fees Record
        </span>
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
                  {row.studentName}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.class}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.section}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.feeName}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.totalAmount}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    color: "#566166",
                    fontWeight: "500",
                  }}
                >
                  {row.balanceAmount}
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
        <Divider sx={{}}/>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Pagination
            count={Math.ceil(feeList.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default ViewFeesDetails;
