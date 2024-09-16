import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Select, MenuItem, OutlinedInput, Box, Button, Snackbar, Alert } from '@mui/material';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { getClassDetails, getSectionDetails } from "../../../redux/action/Student";
import { addCircular } from "../../../redux/action/admin";

const AdminCircular = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [selectSection, setSelectSection] = useState('');
    const [classList, setClassList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getClassDetails((res, err) => {
            if (res && res.statusCode === 200) {
                setClassList(res.data);
            } else {
                showSnackbar(err ? err.message : 'An error occurred while fetching class details.', 'error');
            }
        }));
        dispatch(getSectionDetails((res, err) => {
            if (res && res.statusCode === 200) {
                setSectionList(res.data);
            } else {
                showSnackbar(err ? err.message : 'An error occurred while fetching section details.', 'error');
            }
        }));
    }, [dispatch]);

    const handleClassChange = (event) => {
        setSelectClass(event.target.value);
    };

    const handleSectionChange = (event) => {
        setSelectSection(event.target.value);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title,
            date,
            message
        };
        const classId = selectClass;

        dispatch(addCircular(data, classId, (res, err) => {
            if (res && res.statusCode === 200) {
                showSnackbar('Circular added successfully', 'success');
                setTitle('');
                setDate('');
                setMessage('');
                setSelectClass('');
                setSelectSection('');
            } else {
                showSnackbar(err ? err.message : 'An error occurred while adding the circular.', 'error');
            }
        }));
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 6.5, mb: 4 }}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
                            ADD CIRCULAR DETAILS
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Title</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter Your Title"
                                        sx={{ mt: 1 }}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Date</Typography>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        placeholder="Enter Date"
                                        sx={{ mt: 1 }}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Message</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter Message"
                                        sx={{ mt: 1 }}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box>
                                        <Typography variant="body1">Class</Typography>
                                        <Select
                                            displayEmpty
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected === "" || selected === null) {
                                                    return (
                                                        <span style={{ opacity: "0.48" }}>
                                                            Select Class
                                                        </span>
                                                    );
                                                }
                                                const selectedClass = classList.find(cls => cls._id === selected);
                                                return selectedClass ? selectedClass.className : '';
                                            }}
                                            value={selectClass}
                                            onChange={handleClassChange}
                                            sx={{ mt: 1, fontSize: "14px", fontWeight: "400" }}
                                            fullWidth
                                        >
                                            {classList.map((classItem) => (
                                                <MenuItem
                                                    key={classItem._id}
                                                    value={classItem._id}
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
                                                    {classItem.className}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box>
                                        <Typography variant="body1">Section</Typography>
                                        <Select
                                            displayEmpty
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected === "" || selected === null) {
                                                    return (
                                                        <span style={{ opacity: "0.48" }}>
                                                            Select Section
                                                        </span>
                                                    );
                                                }
                                                const selectedSection = sectionList.find(sec => sec._id === selected);
                                                return selectedSection ? selectedSection.sectionName : '';
                                            }}
                                            value={selectSection}
                                            onChange={handleSectionChange}
                                            sx={{ mt: 1, fontSize: "14px", fontWeight: "400" }}
                                            fullWidth
                                        >
                                            {sectionList.map((section) => (
                                                <MenuItem
                                                    key={section._id}
                                                    value={section._id}
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
                                                    {section.sectionName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="center" sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" type="submit" sx={{ fontWeight: 'bold' }}>
                                        ADD CIRCULAR
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default AdminCircular;
