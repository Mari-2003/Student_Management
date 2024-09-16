import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Box, Divider } from '@mui/material';
import { PurpleButton } from './ButtonStyles';

const TableTemplate = ({ columns, rows = [], buttonName, onViewClick, onPayClick }) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleButtonClick = (row, actionType) => {
    switch (actionType) {
      case 'view':
        onViewClick(row);
        break;
      case 'pay':
          onPayClick(row);
        break;
      default:
        console.warn(`No handler for action type: ${actionType}`);
    }
  };

  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: "0px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center" component="th" scope="row">S.NO</StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  align="center"
                  component="th"
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  scope="row"
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row, index) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <StyledTableCell align="center">{(page - 1) * rowsPerPage + index + 1}</StyledTableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell align="center" key={column.id}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center">
                    {buttonName === 'view' && (
                      <PurpleButton
                        variant="outlined"
                        onClick={() => handleButtonClick(row, 'view')}
                      >
                        View
                      </PurpleButton>
                    )}
                    {buttonName === 'pay' && (
                      <PurpleButton
                        variant="outlined"
                        onClick={() => handleButtonClick(row, 'pay')}
                      >
                        Pay
                      </PurpleButton>
                    )}
                    {/* Add more buttons as needed */}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={columns.length + 2}>
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </TableContainer>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#a389f4',
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 600,
    border: '1px solid grey',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default TableTemplate;
