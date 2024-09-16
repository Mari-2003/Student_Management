import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import TableTemplate from "../../components/layout/TableTemplate";
import { getCircular, deleteCircular } from '../../redux/action/Student';
import AlertDialogBox from '../../components/layout/AlertDialogBox';

const StudentCircular = () => {
  const dispatch = useDispatch();
  const [circularData, setCircularData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const studentColumns = [
    { id: 'title', label: 'Title' },
    { id: 'date', label: 'Date', minWidth: 50 },
    { id: 'message', label: 'Message', minWidth: 50 },
  ];

  useEffect(() => {
    dispatch(getCircular((res, err) => {
      if (res.statusCode === 200) {
        const data = res.data;
        setCircularData(data);
      } else if (err) {
        console.log('Error Message:', err.message);
      } else {
        console.log('Error:', res);
      }
    }));
  }, [dispatch]);

  const handleViewClick = (data) => {
    setDialogData(data);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogData(null);
  };

  const handleSubmit = (id) => {
    dispatch(deleteCircular(id, (res, err) => {
      if (res.statusCode === 200) {
        // Remove the deleted circular from the state
        setCircularData((prevData) => prevData.filter(item => item.circularId !== id));
        handleDialogClose();
      } else if (err) {
        console.log('Error Message:', err.message);
      } else {
        console.log('Error:', res);
      }
    }));
  };

  return (
    <>
      <Box container sx={{ mb: 2, mt: 10, mx: 2, borderRadius: "20px" }}>
        <TableTemplate
          columns={studentColumns}
          rows={circularData}
          buttonName={'view'}
          onViewClick={handleViewClick}
        />
        <AlertDialogBox
          open={dialogOpen}
          onClose={handleDialogClose}
          handleSubmit={handleSubmit}
          data={dialogData}
        />
      </Box>
    </>
  );
};

export default StudentCircular;
