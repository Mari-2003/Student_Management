import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TableTemplate from '../../components/layout/TableTemplate';
import { Box, Grid, Divider, IconButton, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getFees } from '../../redux/action/Student';
import FormDialog from '../../components/layout/FormDialog';

const StudentFees = () => {
  const dispatch = useDispatch();
  const [nameselect, setNameselect] = useState('');
  const [feeList, setFeeList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const studentColumns = [
    { id: 'feeName', label: 'Fee Name' },
    { id: 'feeDescription', label: 'Fee Description', minWidth: 50 },
    { id: 'totalAmount', label: 'Total Amount', minWidth: 50 },
    { id: 'balanceAmount', label: 'Balance Amount', minWidth: 50 },
  ];

  const handleSearch = (event) => {
    if (event.key === "Enter" || (event.keyCode === 32 && event.target.selectionStart === 0)) {
      event.preventDefault();
    }
    setNameselect(event.target.value);
  };

  const handleKeyPress = (event) => {
    // Implement key press functionality
  };

  useEffect(() => {
    dispatch(getFees((res, err) => {
      if (res.statusCode === 200) {
        const rawData = res.data;
        let dataArray;
        if (Array.isArray(rawData)) {
          dataArray = rawData;
        } else if (typeof rawData === 'object') {
          dataArray = [rawData];
        } else {
          console.error('Unexpected data format:', rawData);
          return;
        }
        const data = dataArray.map(item => ({
          feeName: item.feeName || '',
          feeDescription: item.feeDescription || '',
          totalAmount: item.totalAmount || '',
          balanceAmount: item.balanceAmount || '',
        }));
        setFeeList(data);
      } else if (err) {
        console.log('Error Message:', err.message);
      } else {
        console.log('Error:', res);
      }
    }));
  }, [dispatch]);

  const handlePayClick = (data) => {
    setDialogData(data);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogData(null);
  };

  const handleSubmit = () => {
    // Handle submit action
  };

  return (
    <Box container sx={{ px: 3, pt: 10, pb: 3 }}>
      <Grid container justifyContent={"space-between"} sx={{ backgroundColor: 'white' }}>
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
              placeholder="Fee name..."
              value={nameselect}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Divider orientation="vertical" sx={{ height: "72px" }} />
        </Grid>
      </Grid>
      <TableTemplate
        sx={{ minWidth: "60vh", overflow: 'scroll' }}
        columns={studentColumns}
        onPayClick={handlePayClick}
        rows={feeList}
        buttonName={"pay"}
      />
      <FormDialog
        open={dialogOpen}
        title={'Pay Amount'}
        onClose={handleDialogClose}
      />
    </Box>
  );
};

export default StudentFees;
