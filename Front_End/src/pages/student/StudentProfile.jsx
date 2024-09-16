import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Paper, Typography, Avatar } from '@mui/material';
import styled from 'styled-components';
import { getStudent } from '../../redux/action/Student';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    rollNumber: '',
    class:'',
    section:'',
    email:"",
    mobileNumber: '',
    address: ''
  });

  const userDetails = JSON.parse(window.localStorage.getItem("userDetails"));
  const id = userDetails.studentDetails._id || '';

  useEffect(() => {
    dispatch(getStudent(id, (res, err) => {
      if (res.statusCode === 200) {
        setProfileData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          gender: res.data.gender,
          rollNumber: res.data.rollNumber,
          class: res.data.className,
          section: res.data.sectionName,
          email: res.data.email,
          mobileNumber: res.data.mobileNumber,
          address: res.data.address
        });
      } else {
        //console.log(err.message)
        //console.log('An error occurred while fetching student details.');
      }
    }));
  }, [dispatch, id]);

  const getInitials = (firstName) => {
    return (firstName[0] || '').toUpperCase();
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mb: 4, mt: 10 }}>
        <StyledPaper>
          <Title>PROFILE</Title>
          <Avatar sx={{ width: 90, height: 90, fontSize: '35px', my: 2, backgroundColor: "#b3a3f7" }}>
            {getInitials(profileData.firstName)}
          </Avatar>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 1, display: "flex", justifyContent: 'space-between' }}>
              <Typography variant="h5">First Name: {profileData.firstName}</Typography>
              <Typography variant="h5">Last Name: {profileData.lastName}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1, display: "flex", justifyContent: 'space-between' }}>
              <Typography variant="h5">Gender: {profileData.gender}</Typography>
              <Typography variant="h5">Roll Number: {profileData.rollNumber}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1, display: "flex", justifyContent: 'space-between' }}>
              <Typography variant="h5">Class: {profileData.class}</Typography>
              <Typography variant="h5" sx={{ mr: 1 }}>Section: {profileData.section}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1, display: "flex" }}>
              <Typography variant="h5">Email: {profileData.email}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1, display: "flex" }}>
              <Typography variant="h5">Address: {profileData.address}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1, display: "flex" }}>
              <Typography variant="h5">Mobile Number: {profileData.mobileNumber}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </>
  );
}

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 26px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 90vh;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 14px;
`;

export default StudentProfile;
