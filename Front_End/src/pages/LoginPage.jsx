import { Box, Checkbox, createTheme, CssBaseline, FormControlLabel, Alert, Grid, Paper, TextField,  IconButton, InputAdornment, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LightPurpleButton } from '../components/layout/ButtonStyles';
import { Link, useNavigate } from 'react-router-dom';
import bgPic from '../assets/designlogin.jpg';
import { useDispatch } from 'react-redux';
import Login from "../redux/action/login";
import validator from 'validator'; 
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [toggle, setToggle] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rollNumber, setRollNumber] = useState(''); 
    const [rollNumberError, setRollNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const[severity,setSeverity] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      let data;
      let redirectPath;
  
      if (role === 'student') {
          data = { rollNumber, email, password };
          redirectPath = '/student/dashboard';
      } 
      if (role === 'admin') {
          data = { email, password };
          redirectPath = '/admin/dashboard';
      } 
  
      dispatch(Login(data, role, (err, res) => {
          if (err) {
            showSnackbar(err.message,"error");
          } else if (res.statusCode === 200) {
            showSnackbar(res.message,"success")
            window.localStorage.setItem("accessToken", res.data.accessToken);
            window.localStorage.setItem(
              "userDetails",
              JSON.stringify(res.data) 
            )
              navigate(redirectPath);
          } else {
             showSnackbar(err.message)
          }
      }));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const showSnackbar = (msg,severity) => {
    setOpen(true);
    setSeverity(severity);
    setSnackbarMessage(msg);
  };


    const validateRollNumber = (e) => {
        const rollNumberValue = e.target.value;
        setRollNumber(rollNumberValue);
        if (validator.isEmpty(rollNumberValue)) {
            setRollNumberError("Roll Number is required");
        } else {
            setRollNumberError("");
        }
    };

    const validateEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        if (validator.isEmpty(emailValue)) {
            setEmailError("Email ID is required");
        } else if (validator.isEmail(emailValue)) {
            setEmailError("");
        } else {
            setEmailError("Invalid Email ID");
        }
    };

    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

const validatePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    
    if (validator.isEmpty(passwordValue)) {
        setPasswordError("Password is required");
    } else if (passwordPattern.test(passwordValue)) {
        setPasswordError("");
    } else {
        setPasswordError("Password must be at least 8 characters long, include at least one uppercase letter and one special character");
    }
};
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant='h4' sx={{ mb: 2, color: "#2c2143", fontWeight: 'Bold' }}>
                            {role} Login
                        </Typography>
                        <Typography variant='h7'>
                            Welcome back! Please enter your details
                        </Typography>
                        <Box component='form' sx={{ mt: 2 }} onSubmit={handleSubmit}>
                            {role === 'student' && (
                                <TextField
                                    margin="normal"
                                    id="rollNumber"
                                    label="Enter Your Roll Number"
                                    variant="outlined"
                                    name='rollNumber'
                                    type='number'
                                    fullWidth
                                    error={!!rollNumberError}
                                    helperText={rollNumberError}
                                    onChange={validateRollNumber}
                                    sx={{ mb: 2 }}
                                />
                            )}
                            <TextField
                                margin="normal"
                                id="email"
                                label="Enter Your Email"
                                variant="outlined"
                                name='email'
                                type='email'
                                autoComplete='name'
                                autoFocus
                                fullWidth
                                error={!!emailError}
                                helperText={emailError}
                                onChange={validateEmail}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="normal"
                                id="password"
                                label="Enter Your Password"
                                type={toggle ? 'text' : 'password'}
                                variant="outlined"
                                name='password'
                                fullWidth
                                error={!!passwordError}
                                helperText={passwordError}
                                onChange={validatePassword}
                                sx={{ mb: 2 }}
                                InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton onClick={() => setToggle(!toggle)}>
                                              {toggle ? (
                                                  <Visibility />
                                              ) : (
                                                  <VisibilityOff />
                                              )}
                                          </IconButton>
                                      </InputAdornment>
                                  ),
                              }}
                            />
                            <Grid container sx={{ display: 'flex', justifyContent: "space-between", mt: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox value='Remember' color='primary' />}
                                    label="Remember me"
                                />
                                <StyledLink>Forget Password?</StyledLink>
                            </Grid>
                            <LightPurpleButton type='submit' fullWidth variant="contained" sx={{ mt: 3 }}>
                                Login
                            </LightPurpleButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7}>
                    <Box sx={{
                        height: '100%',
                        backgroundImage: `url(${bgPic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} />
                </Grid>
                <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert
                sx={{ fontWeight: 600 }}
                onClose={handleClose}
                severity={severity}
                variant="filled"
              >
                {snackbarMessage}.
              </Alert>
            </Snackbar>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage;

const StyledLink = styled(Link)`
 margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
  &:hover {
    text-decoration: underline;
  }
`;
