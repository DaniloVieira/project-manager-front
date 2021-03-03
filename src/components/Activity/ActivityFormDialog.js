import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { format } from 'date-fns';

const ActivityFormDialog = (props) => {
  const { onClose, open, inputChangeHandler, activity, onSubmitSave } = props;

  const handleClose = () => {
    onClose();
  };

  const internalhandleChange = (value, identifier) => {
    inputChangeHandler(value, identifier);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitSave();
  };

  const dtPicker = (dtLabel, dtStyle, identifier) => (
    <KeyboardDateTimePicker
      autoOk
      label={dtLabel}
      value={activity[identifier]}
      style={dtStyle}
      format='MM/dd/yyyy HH:mm'
      ampm={false}
      onError={console.log}
      onChange={(value) => {
        internalhandleChange(format(value, 'yyyy-MM-dd HH:mm:ss'), identifier);
      }}
    />
  );

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
            <Grid item xs={6}>
              <TextField
                id='activity-desc'
                label='Description'
                margin='dense'
                fullWidth
                size='small'
                value={activity['description']}
                onChange={(event) => {
                  internalhandleChange(event.target.value, 'description');
                }}
              />
            </Grid>
            <Grid item xs={6} container justify='flex-end'>
              <Grid item xs={6}>
                {dtPicker(
                  'Start',
                  { paddingRight: 10, paddingTop: 6 },
                  'dtStart'
                )}
              </Grid>
              <Grid item xs={6}>
                {dtPicker('End', { paddingLeft: 10, paddingTop: 6 }, 'dtEnd')}
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
                  internalhandleChange(event.target.value, 'details')
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
