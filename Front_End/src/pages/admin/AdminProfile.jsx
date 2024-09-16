import React, { useState,useEffect } from 'react'
import { Container, Grid, Paper, Typography,Avatar   } from '@mui/material'
import {styled} from 'styled-components'
import {useDispatch} from 'react-redux';
import {getAdmin} from '../../redux/action/admin'

const AdminProfile = () => {
  const dispatch = useDispatch();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        schooName: '',
        schoolLocation: ''
      });
      useEffect(() => {
        dispatch(getAdmin((res, err) => {
            if (res?.statusCode === 200) {
                console.log(res.message, "success");
                setProfileData({
                    name: res.data.name,
                    email: res.data.email,
                    schoolName: res.data.schoolName,
                    schoolLocation: res.data.schoolLocation
                });
            } else if (err) {
                //console.log(err.message || 'Error occurred while fetching admin data', "error");
            } else {
                //console.log('Unexpected error occurred', "error");
            }
        }));
    }, [dispatch]);
    
    const getInitials = (name) => {
      return (name[0] || '').toUpperCase();
    };
  
    return (
      <>
         <Container maxWidth="sm" sx={{ mb: 4, mt: 10 }} rounded>
        <StyledPaper>
          <Title>PROFILE</Title>
          <Avatar sx={{ width: 90, height: 90, fontSize: '24px', my: 2,  backgroundColor:"#b3a3f7"}}>
            {getInitials(profileData.name)}
          </Avatar>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{mb:1}}>
              <Typography variant="h5">Name: {profileData.name}</Typography>
            </Grid>
            <Grid item xs={12} sx={{mb:1}}>
              <Typography variant="h5">Email: {profileData.email}</Typography>
            </Grid>
            <Grid item xs={12} sx={{mb:1}}>
              <Typography variant="h5">School Name: {profileData.schoolName}</Typography>
            </Grid>
            <Grid item xs={12} sx={{mb:1}}>
              <Typography variant="h5">School Location: {profileData.schoolLocation}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
      </>
    );
  }

const StyledPaper = styled(Paper)`
display:flex;
flex-direction:column;
padding:26px;
justify_content:space-between;
align-items:center;
text-align:center;
height:75vh;
`;
const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  marign-bottom: 16px;
`;




export default AdminProfile