import React from 'react';
import StudentSideBar from './StudentSideBar';
import { Box, CssBaseline, List } from '@mui/material';
import StudentHomePage from './StudentHomePage';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import StudentFees from './StudentFees';
import StudentComplain from './StudentComplain';
import StudentProfile from './StudentProfile';
import StudentCircular from './StudentCircular';

const StudentDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <List component="nav" variant="permanent">
        <StudentSideBar />
      </List>
      <Box component="main" sx={styles.boxStyled}>
        <Routes>
          <Route path="/home" element={<StudentHomePage />} />
          <Route path="*" element={<Navigate to="/student/home" />} />
          <Route path ="/fees" element={<StudentFees/>}/>
          <Route path ='/complain' element={<StudentComplain/>}/>
          <Route path= '/profile' element={<StudentProfile/>}/>
          <Route path ='/circular' element={<StudentCircular/>}/>
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

const styles = {
  boxStyled: {
      backgroundColor: (theme) =>
          theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
  }
};

export default StudentDashboard;
