import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Card, CardContent, Typography, TextField, Select, MenuItem, OutlinedInput, Box, Button, Snackbar, Alert } from '@mui/material';
import { styled } from 'styled-components';
import { getClassDetails, getSectionDetails } from '../../../redux/action/Student';
import { addFeesDetails } from '../../../redux/action/admin';

const FeesDetails = () => {
    const dispatch = useDispatch();
    const [feeName, setFeeName] = useState('');
    const [feeAmount, setFeeAmount] = useState('');
    const [feeDescription, setFeeDescription] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [classList, setClassList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [selectSection, setSelectSection] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');

    const handleClassChange = (event) => {
        setSelectClass(event.target.value);
    };

    const handleSectionChange = (event) => {
        setSelectSection(event.target.value);
    };

    useEffect(() => {
        dispatch(getClassDetails((res, err) => {
            if (res.statusCode === 200) {
                setClassList(res.data);
            } else {
                showSnackbar(err ? err.message : 'An error occurred while fetching class details.', 'error');
            }
        }));

        dispatch(getSectionDetails((res, err) => {
            if (res.statusCode === 200) {
                setSectionList(res.data);
            } else {
                showSnackbar(err ? err.message : 'An error occurred while fetching section details.', 'error');
            }
        }));
    }, [dispatch]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const showSnackbar = (msg, severity) => {
        setSnackbarMessage(msg);
        setSeverity(severity);
        setOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            feeName,
            feeAmount,
            feeDescription
        };
        const classId = selectClass
        const sectionId = selectSection
      dispatch(addFeesDetails(data, classId,sectionId, (res,err)=>{
         if (res.statusCode === 200 ||201) {
            showSnackbar(res.message);
           setFeeName('');
           setFeeAmount('');
           setFeeDescription('');
           setSelectClass('');
           setSelectSection('');
        } else {
            showSnackbar(err ? err.message : 'An error occurred while adding the fees.', 'error');
        }

      }));
       
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 6.5, mb: 4 }}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
                            ADD FEES DETAILS
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Fee Name</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter Fee Name"
                                        sx={{ mt: 1 }}
                                        value={feeName}
                                        onChange={(e) => setFeeName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Fee Amount</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter Fee Amount"
                                        sx={{ mt: 1 }}
                                        value={feeAmount}
                                        onChange={(e) => setFeeAmount(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Fee Description</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter Fee Description"
                                        sx={{ mt: 1 }}
                                        value={feeDescription}
                                        onChange={(e) => setFeeDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <span style={{ fontWeight: 400, fontSize: '14px' }}>
                                            Class
                                        </span>
                                        <Select
                                            displayEmpty
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected === '' || selected === null) {
                                                    return <span style={{ opacity: '0.48' }}>Select Class</span>;
                                                }
                                                const selectedClass = classList.find(cls => cls._id === selected);
                                                return selectedClass ? selectedClass.className : '';
                                            }}
                                            value={selectClass}
                                            onChange={handleClassChange}
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                marginTop: '5px',
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: '#b3a3f7',
                                                    '&.Mui-focused': {
                                                        color: '#BE8976',
                                                    },
                                                },
                                                '&.Mui-focused': {
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#b3a3f7',
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
                                                    value={classItem._id}
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#b3a3f7',
                                                        fontWeight: '400',
                                                    }}
                                                    sx={{
                                                        '&.Mui-selected': {
                                                            background: '#b3a3f7 !important',
                                                            color: '#fff !important',
                                                        },
                                                    }}
                                                >
                                                    {classItem.className}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <span style={{ fontWeight: 400, fontSize: '14px' }}>
                                            Section
                                        </span>
                                        <Select
                                            displayEmpty
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected === '' || selected === null) {
                                                    return <span style={{ opacity: '0.48' }}>Select Section</span>;
                                                }
                                                const selectedSection = sectionList.find(sec => sec._id === selected);
                                                return selectedSection ? selectedSection.sectionName : '';
                                            }}
                                            value={selectSection}
                                            onChange={handleSectionChange}
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                marginTop: '5px',
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: '#b3a3f7',
                                                    '&.Mui-focused': {
                                                        color: '#BE8976',
                                                    },
                                                },
                                                '&.Mui-focused': {
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#b3a3f7',
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
                                                    value={section._id}
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#b3a3f7',
                                                        fontWeight: '400',
                                                    }}
                                                    sx={{
                                                        '&.Mui-selected': {
                                                            background: '#b3a3f7 !important',
                                                            color: '#fff !important',
                                                        },
                                                    }}
                                                >
                                                    {section.sectionName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="center" sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" type="submit" sx={{ fontWeight: 'bold' }}>
                                        ADD FEES
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </StyledCard>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={severity}
                        variant="filled"
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

const StyledCard = styled(Card)`
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;

export default FeesDetails;
