import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  OutlinedInput,
  Select,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Alert,
  Button,
  ThemeProvider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../components/css/Theme"
import validator from 'validator'; 
import Snackbar from "@mui/material/Snackbar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {getClassDetails, getSectionDetails, addStudentDetails} from '../../../redux/action/Student'



const AddStudent = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false);
    const [classList ,setClassList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [selectGender, setSelectGender]= useState('');
    const [email,setEmail] = useState('');
    const[emailError,setEmailError] = useState('');
    const[rollNumber,setRollNumber] =useState('');
    const [rollNumberError,setRollNumberError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [address, setAddress] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [selectSection, setSelectSection] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity,setSeverity] = useState("");
    const [open, setOpen] = useState(false);

    const genderDialog = ["Male","Female"];
    const userDetails = JSON.parse(window.localStorage.getItem("userDetails"));
    const adminId = userDetails.adminDetails._id || '';

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form fields before submission
        if (rollNumberError || emailError || mobileNumberError || passwordError) {
            showSnackbar("Please fix the errors in the form before submitting.");
            setSeverity('error')
            return;
        }
        
        let data = {
            firstName,
            lastName,
            gender: selectGender,
            rollNumber,
            classId: selectClass, // ID
            sectionId: selectSection, // ID
            adminId: adminId,
            email,
            mobileNumber,
            address,
            password
        };
        
        
        dispatch(addStudentDetails(data, (err, res) => {
            if (err) {
                showSnackbar(err.message);
                setSeverity('error')
            } else if (res.statusCode === 200 ||201) {
                showSnackbar(res.message, 'success');
                setSeverity('success');
                setFirstName("");
                setLastName("");
                setSelectGender('');
                setRollNumber('');
                setSelectClass('');
                setSelectSection('');
                setEmail("");
                setMobileNumber('');
                setAddress("");
                setPassword("");
            } else {
                showSnackbar(res.message || 'An unexpected error occurred.',"error");
            }
        }));
    };
    
    
    const handleClassChange = (event) => {
        const selectedClassId = event.target.value;
        setSelectClass(selectedClassId);
    };
    
    const handleSectionChange = (event) => {
        const selectedSectionId = event.target.value;
        setSelectSection(selectedSectionId);
    };
    

    const handleGenderChange = (event) =>{
        setSelectGender(event.target.value);
    }

    const handleSnackbarClose = (event, reason) => {
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
    useEffect(() => {
        dispatch(getClassDetails((res, err) => {
          if (res.statusCode===200) {
             setClassList(res.data);
          } else {
            showSnackbar(err ? err.message : 'An error occurred while fetching class details.',"error");
          }
        }));
        dispatch(getSectionDetails((res,err) =>{
            if (res.statusCode===200) {
                setSectionList(res.data);
             } else {
                showSnackbar(err ? err.message : 'An error occurred while fetching section details.',"error");
             }
        }))
      }, [dispatch]);
    const handleCloseIcon = () => {
      setFirstName("");
      setLastName("");
      setSelectGender('');
      setRollNumber('');
      setSelectClass('');
      setSelectSection('');
      setEmail("");
      setMobileNumber('');
      setAddress("");
      setPassword("");
      onClose();
    };


    const mobileNumberPattern = /^[6-9]\d{9}$/;
    const validateMobileNumber = (e) =>{
      const mobileNumberValue = e.target.value;
      setMobileNumber(mobileNumberValue);
        
      if (validator.isEmpty(mobileNumberValue)) {
          setMobileNumberError("Mobile Number is required");
      } else if (mobileNumberPattern.test(mobileNumberValue)) {
          setMobileNumberError("");
      } else {
        setMobileNumberError("Mobile Number must be start at  6 to 9");
      }
    }

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
        <ThemeProvider theme={theme}>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle id="customized-dialog-title" sx={{ fontWeight: "600", fontSize: "15px" }}>
                    ADD STUDENT RECORD
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseIcon}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        borderRadius: "5px",
                        background: "rgba(88, 88, 88, 0.05)",
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Divider />
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    First Name
                                </span>
                                <TextField
                                    fullWidth
                                    placeholder="Enter a First Name"
                                    sx={{ marginTop: "5px" }}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Last Name
                                </span>
                                <TextField
                                    fullWidth
                                    placeholder="Enter a Last Name"
                                    sx={{ marginTop: "5px" }}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Gender
                                </span>
                                <Select
                                    displayEmpty
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected === "" || selected === null) {
                                            return (
                                                <span style={{ opacity: "0.48" }}>
                                                    Select Gender
                                                </span>
                                            );
                                        }
                                        return selected;
                                    }}
                                    value={selectGender}
                                    onChange={handleGenderChange}
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        marginTop: "5px",
                                    }}
                                    fullWidth
                                >
                                    {genderDialog.map((gender, index) => (
                                        <MenuItem
                                            key={index}
                                            value={gender}
                                            style={{
                                                fontSize: "14px",
                                                color: "#232323",
                                                fontWeight: "400",
                                            }}
                                            sx={{
                                                "&.Mui-selected": {
                                                    background: "#b3a3f7 !important",
                                                    color: "#fff !important",
                                                },
                                            }}
                                        >
                                            {gender}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Roll Number
                                </span>
                                <TextField
                                    fullWidth
                                    type="number"
                                    placeholder="Enter a Roll Number"
                                    sx={{ marginTop: "5px" }}
                                    value={rollNumber}
                                    error={!!rollNumberError}
                                    helperText={rollNumberError}
                                    onChange={validateRollNumber}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                        Class
                                    </span>
                                    <Select
                                            displayEmpty
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected === "" || selected === null) {
                                    return <span style={{ opacity: "0.48" }}>Select Class</span>;
                                }
                                // Find the class name from the list using the selected ID
                                const selectedClass = classList.find(cls => cls._id === selected);
                                return selectedClass ? selectedClass.className : '';
                            }}
                            value={selectClass}
                            onChange={handleClassChange}
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                marginTop: "5px",
                            }}
                            fullWidth
                            sx={{
                                "& .MuiInputLabel-root": {
                                    color: "#b3a3f7",
                                    "&.Mui-focused": {
                                        color: "#BE8976",
                                    },
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#b3a3f7",
                                    },
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 210,
                                    },
                                },
                            }}
                        >
                            {classList.map((classItem) => (
                                <MenuItem
                                    key={classItem._id}
                                    value={classItem._id} // ID is used as value
                                    style={{
                                        fontSize: "14px",
                                        color: "#b3a3f7",
                                        fontWeight: "400",
                                    }}
                                    sx={{
                                        "&.Mui-selected": {
                                            background: "#b3a3f7 !important",
                                            color: "#fff !important",
                                        },
                                    }}
                                >
                                    {classItem.className} {/* Display name */}
                                </MenuItem>
                            ))}
                        </Select>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                        Section
                                    </span>
                                   <Select
    displayEmpty
    input={<OutlinedInput />}
    renderValue={(selected) => {
        if (selected === "" || selected === null) {
            return <span style={{ opacity: "0.48" }}>Select Section</span>;
        }
        // Find the section name from the list using the selected ID
        const selectedSection = sectionList.find(sec => sec._id === selected);
        return selectedSection ? selectedSection.sectionName : '';
    }}
    value={selectSection}
    onChange={handleSectionChange}
    style={{
        fontSize: "14px",
        fontWeight: "400",
        marginTop: "5px",
    }}
    fullWidth
    sx={{
        "& .MuiInputLabel-root": {
            color: "#b3a3f7",
            "&.Mui-focused": {
                color: "#BE8976",
            },
        },
        "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#b3a3f7",
            },
        },
    }}
    MenuProps={{
        PaperProps: {
            style: {
                maxHeight: 210,
            },
        },
    }}
>
    {sectionList.map((section) => (
        <MenuItem
            key={section._id}
            value={section._id} // ID is used as value
            style={{
                fontSize: "14px",
                color: "#b3a3f7",
                fontWeight: "400",
            }}
            sx={{
                "&.Mui-selected": {
                    background: "#b3a3f7 !important",
                    color: "#fff !important",
                },
            }}
        >
            {section.sectionName} {/* Display name */}
        </MenuItem>
    ))}
</Select>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Email
                                </span>
                                <TextField
                                    fullWidth
                                    placeholder="Enter a Email"
                                    sx={{ marginTop: "5px" }}
                                    value={email}
                                    error={!!emailError}
                                    helperText={emailError}
                                    onChange={validateEmail}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Mobile Number
                                </span>
                                <TextField
                                    fullWidth
                                    type="number"
                                    placeholder="Enter a Mobile Number"
                                    sx={{ marginTop: "5px" }}
                                    value={mobileNumber}
                                    error={!!mobileNumberError}
                                    helperText={mobileNumberError}
                                    onChange={validateMobileNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Address
                                </span>
                                <TextField
                                    fullWidth
                                    placeholder="Enter a Address"
                                    sx={{ marginTop: "5px" }}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <span style={{ fontWeight: 400, fontSize: "14px" }}>
                                    Password
                                </span>
                                <TextField
        fullWidth
        type={toggle ? 'text' : 'password'}
        placeholder="Enter a Password"
        sx={{ marginTop: "5px" }}
        value={password}
        error={!!passwordError}
        helperText={passwordError}
        onChange={validatePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setToggle(!toggle)}>
                {toggle ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
                            </Grid>
                            <Grid item xs={12} display="flex" justifyContent="center">
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <Alert
                        sx={{ fontWeight: 600 }}
                        onClose={handleSnackbarClose}
                        severity={severity}
                        variant="filled"
                    >
                        {snackbarMessage}.
                    </Alert>
                </Snackbar>
            </Dialog>
        </ThemeProvider>
    );
};

export default AddStudent;
