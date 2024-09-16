import { Grid, Paper } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import School from '@mui/icons-material/School';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const ChooseUser = () => {
  return (
    <StyledContainer>
        <Container>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Link to='/admin/login' style={{ textDecoration: 'none' }}>
                        <StyledPaper elevation={3}>
                            <Box mb={2}>
                                <AccountCircle fontSize='inherit' sx={{fontSize:70}}/>
                            </Box>
                            <StyledTypography>
                                Admin
                            </StyledTypography>
                            Login as an administrator to access the dashboard to manage app data.
                        </StyledPaper>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Link to='/student/login' style={{ textDecoration: 'none' }}>
                        <StyledPaper elevation={3}>
                            <Box mb={2}>
                                <School fontSize='inherit' sx={{fontSize:70}} />
                            </Box>
                            <StyledTypography>
                                Student
                            </StyledTypography>
                            Login as a student to explore course profile and fees Structure.
                        </StyledPaper>
                    </Link>
                </Grid> 
            </Grid>
        </Container>
    </StyledContainer>
  )
}

export default ChooseUser;

const StyledContainer = styled.div`
 background: linear-gradient(to bottom, #411d70, #19118b);
 display: flex;
 justify-content: center;
 height: 100vh;
 padding: 2rem;
`;

const StyledPaper = styled(Paper)`
 padding: 50px;
 text-align: center;
 background-color: #1f1f38;
 color: rgba(255, 255, 255, 0.6);
 cursor: pointer;

 &:hover {
   background-color: #2c2c6c;
   color: white;
 }
`;

const StyledTypography = styled.h2`
 margin-bottom: 10px;
`;
