import React from 'react';
import { Box, CssBaseline, List } from '@mui/material';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminHomePage from './AdminHomePage';
import ViewStudent from './student/ViewStudent';
import AdminSidebar from './AdminSiderBar';
import AdminProfile from './AdminProfile';
import FeesDetails from './student/FeesDetails';
import ViewFeesDetails from './student/ViewFeesDetails';
import AdminCircular from './student/AdminCircular';
import Complain from './student/Complain';

const AdminDashboard = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <List variant="permanent" component="nav">
          <AdminSidebar />
        </List>
        <Box component="main" sx={styles.boxStyled}>
          <Routes>
            <Route path="/home" element={<AdminHomePage />} />
            <Route path="/viewStudent" element={<ViewStudent />} />
            <Route path="/profile" element={<AdminProfile/>}/>
            <Route path='/fees' element={<FeesDetails/>} />
            <Route path='/viewFees' element={<ViewFeesDetails/>}/>
            <Route path='/circular' element={<AdminCircular/>}/>
            <Route path='/complain' element={<Complain/>} />
            <Route path="*" element={<Navigate to="/admin/home" />} />
          </Routes>
          <Outlet/>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: '20px', // Added padding for better layout
  },
};

export default AdminDashboard;
