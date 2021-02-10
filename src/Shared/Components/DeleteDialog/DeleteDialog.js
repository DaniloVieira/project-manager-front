import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const DeleteDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>
        <Alert severity='warning' variant='filled' style={{ width: '100%' }}>
          <Typography
            variant='h5'
            //color='textPrimary'
            style={{ fontWeight: 600 }}
          >
            Atention
          </Typography>
        </Alert>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Typography
            variant='body1'
            //color='textPrimary'
            style={{ fontWeight: 600 }}
          >
            Delete this record?
          </Typography>
          <Typography
            variant='body2'
            //color='textPrimary'
            style={{ fontWeight: 600 }}
          >
            This action can not be undone!
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleListItemClick('addAccount')}
          variant='contained'
          color='secondary'
          size='small'
        >
          DELETE
        </Button>
        <Button
          onClick={() => handleListItemClick('addAccount')}
          variant='contained'
          color='primary'
          size='small'
          autoFocus
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// DeleteDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   // selectedValue: PropTypes.string.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant='subtitle1'>Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant='outlined' color='primary' onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }

export default DeleteDialog;
