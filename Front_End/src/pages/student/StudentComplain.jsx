import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/layout/Popup';
import { BlueButton } from '../../components/layout/ButtonStyles';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
    };

    useEffect(() => {
    }, [])

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Complain</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                            </BlueButton>
                        </form>
                    </div>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;