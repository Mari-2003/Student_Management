import React from 'react'
import styled from 'styled-components';
import student from '../assets/students.svg'
import { Box, Container, Grid } from '@mui/material'
import { LightPurpleButton } from '../components/layout/ButtonStyles';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
  <StyledContainer>
  <Grid container spacing={0}>
  <Grid xs={12} sm={6}>
    <img src={student} alt="Home Page" />
  </Grid>
  <Grid xs={12} sm={6}>
    <StyledPaper elevation={3}>
      <StyledTitle>
      Welcome to
      <br />
      School Management
      <br />
      System
      </StyledTitle>
      <StyledText>
      Streamline school management, class organization, and add students and faculty.
      Seamlessly track attendance, assess performance, and provide feedback.
      Access records, view marks, and communicate effortlessly.
      </StyledText>
      <StyledBox>
        <StyledLink  to='/choose'>
          <LightPurpleButton variant='contained'>
          Login</LightPurpleButton></StyledLink>
      </StyledBox>
    </StyledPaper>

  </Grid>
    </Grid>

    </StyledContainer>
    

        
  )
}

export default HomePage


const StyledContainer = styled(Container)`
display:flex;
justify-content:center;
align-items:center;
height: 100vh;
`;

const StyledPaper = styled.div`
height:100vh;
padding:25px;
`;

const StyledTitle = styled.h1`
font-size:3rem;
color: #252525;
font-weight:bold;
 padding-top: 0;
line-height:normal;
letter-spacing:normal;
`;

const StyledText =styled.p`
marign-top:30px;
marign-bottom:30px;
line-height:normal;
letter-spacing:normal;
`;

const StyledBox = styled(Box)`
display:flex;
align-items:center;
justify-content:center;
 gap: 16px;
padding:25px;

`;
const StyledLink = styled(Link)`
text-decoration: none;
`;