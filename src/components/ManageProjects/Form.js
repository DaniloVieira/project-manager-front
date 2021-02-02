import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Form = (props) => {
  const internalhandleChange = (value, identifier) => {
    props.inputChangeHandler(value, identifier);
  };
  return (
    <form noValidate autoComplete='off'>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <TextField
            id='client-name'
            label='Client Name'
            margin='dense'
            fullWidth
            size='small'
            value={props.values['clientName']}
            onChange={(event) =>
              internalhandleChange(event.target.value, 'clientName')
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='client-description'
            label='Project Description'
            margin='dense'
            fullWidth
            size='small'
            value={props.values['clientDescription']}
            onChange={(event) =>
              internalhandleChange(event, 'clientDescription')
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='project-id'
            select
            label='Project'
            margin='dense'
            fullWidth
            size='small'
            value={props.values['projectId']}
            onChange={(event) =>
              internalhandleChange(event.target.value, 'projectId')
            }
            SelectProps={{
              native: true,
            }}
          >
            {props.values['projects'].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} container justify='flex-end'>
          <Grid item xs={6}>
            <TextField
              id='dt-initial-creation'
              label='Creation'
              margin='dense'
              fullWidth
              size='small'
              value={props.values['initialDtCreation']}
              initialDtCreationonChange={(event) =>
                internalhandleChange(event.target.value, 'initialDtCreation')
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
              id='dt-final-creation'
              label=' '
              margin='dense'
              fullWidth
              size='small'
              value={props.values['finalDtCreation']}
              onChange={(event) =>
                internalhandleChange(event.target.value, 'finalDtCreation')
              }
              type='date'
              style={{ paddingLeft: 10 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} container justify='flex-end'>
          <Grid item xs={6}>
            <TextField
              id='dt-initial-start'
              label='Project start'
              margin='dense'
              fullWidth
              size='small'
              value={props.values['initialDtStart']}
              onChange={(event) =>
                internalhandleChange(event.target.value, 'initialDtStart')
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
              id='dt-final-start'
              label=' '
              margin='dense'
              fullWidth
              size='small'
              value={props.values['finalDtStart']}
              onChange={(event) =>
                internalhandleChange(event.target.value, 'finalDtStart')
              }
              type='date'
              style={{ paddingLeft: 10 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} container justify='flex-end'>
          <Grid item xs={6}>
            <TextField
              id='dt-initial-completion'
              label='Completion'
              margin='dense'
              fullWidth
              size='small'
              value={props.values['initialDtCompletion']}
              onChange={(event) =>
                internalhandleChange(event, 'initialDtCompletion')
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
              id='dt-final-completion'
              label=' '
              margin='dense'
              fullWidth
              size='small'
              value={props.values['finalDtCompletion']}
              onChange={(event) =>
                internalhandleChange(event, 'finalDtCompletion')
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
          <Autocomplete
            multiple
            id='contributors-ids'
            options={props.values['contributors']}
            getOptionLabel={(option) => option.label}
            // defaultValue={props.values['contributorId']}
            onChange={(event, newValue) => {
              return internalhandleChange(newValue, 'contributorId');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Contributors'
                fullWidth
                size='small'
                // onChange={(event) => {
                //   console.log(event.target.value);
                //   return internalhandleChange(event, 'contributorId');
                // }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} container justify='flex-end'>
          <Button variant='contained' color='primary'>
            Primary
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
