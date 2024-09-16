import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const AlertDialogBox = ({ open, onClose, data, handleSubmit }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Circular Details"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          {data ? (
            <>
              <Box>
                <strong>Title:</strong>
                <DialogContentText id="alert-dialog-slide-description">
                  {data.title}
                </DialogContentText>
              </Box>
              <Box>
                <strong>Date:</strong>
                <DialogContentText id="alert-dialog-slide-description">
                  {formatDate(data.date)}
                </DialogContentText>
              </Box>
              <Box>
                <strong>Message:</strong>
                <Box display="flex" flexDirection="column" mt={1}>
                  <DialogContentText id="alert-dialog-slide-description">
                    {data.message}
                  </DialogContentText>
                </Box>
              </Box>
            </>
          ) : (
            <DialogContentText id="alert-dialog-slide-description">
              No data available
            </DialogContentText>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(data.circularId)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogBox;
