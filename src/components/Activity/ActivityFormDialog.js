import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const ActivityFormDialog = (props) => {
  const { onClose, open, inputChangeHandler, activity, onSubmitSave } = props;

  //   const handleClickOpen = () => {
  //     onClose(true);
  //   };

  const handleClose = () => {
    onClose();
  };

  const internalhandleChange = (value, identifier) => {
    inputChangeHandler(value, identifier);
  };

  const onSubmit = () => {
    console.log('save');
    onSubmitSave();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Activity</DialogTitle>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <TextField
                id='activity-desc'
                label='Description'
                margin='dense'
                fullWidth
                size='small'
                value={activity['description']}
                onChange={(event) =>
                  internalhandleChange(event.target.value, 'description')
                }
              />
            </Grid>
            <Grid item xs={4} container justify='flex-end'>
              <Grid item xs={6}>
                <TextField
                  id='dt-start-acvity'
                  label='Start'
                  margin='dense'
                  fullWidth
                  size='small'
                  value={activity['dtStart']}
                  initialDtCreationonChange={(event) =>
                    internalhandleChange(event.target.value, 'dtStart')
                  }
                  type='date'
                  style={{ paddingRight: 10 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='dt-end-activity'
                  label='End'
                  margin='dense'
                  fullWidth
                  size='small'
                  value={activity['dtEnd']}
                  onChange={(event) =>
                    internalhandleChange(event.target.value, 'dtEnd')
                  }
                  type='date'
                  style={{ paddingLeft: 10 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='activity-detail'
                label='Detail'
                fullWidth
                size='small'
                rows={5}
                defaultValue={activity['details']}
                onChange={(event) =>
                  internalhandleChange(event.target.value, 'description')
                }
                multiline
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color='primary'>
            Save
          </Button>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ActivityFormDialog;
