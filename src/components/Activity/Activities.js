import React, { useState, Fragment } from 'react';
import {
  makeStyles,
  Grid,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TablePaginationActions from '../../Shared/Components/TablePagination/TablePagination';
import DeleteDialog from '../../Shared/Components/DeleteDialog/DeleteDialog';
import ActivityFormDialog from './ActivityFormDialog';

import { Activities as rows } from '../../AuxData/Activities';

const useStyles = makeStyles((theme) => ({
  position: {
    marginTop: '25px',
  },
  fab: {
    position: 'relative',
    top: theme.spacing(12),
    left: theme.spacing(12),
  },
}));

const Activities = (props) => {
  const classes = useStyles();
  const [activity, setActivity] = useState({
    id: null,
    description: null,
    details: null,
    dtStart: null,
    dtEnd: null,
  });
  const [openDeleteDiag, setOpenDeleteDiag] = useState(false);
  const [openFormDiag, setOpenFormDiag] = useState(false);
  const [selectedValue, setSelectedValue] = useState('test');
  const [projetctId, setProjectId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProject, setSelectedProject] = useState({
    description: 'Descrition',
    clientName: 'Client Name',
    dtExpectedCompletion: 'Conclusion Date',
  });
  const selectChangeHandler = (value) => {
    // props.inputChangeHandler(value, identifier);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseDeleteDiag = (value) => {
    setOpenDeleteDiag(false);
    setSelectedValue(value);
  };

  const onClickDeleteHandler = () => {
    setOpenDeleteDiag(true);
  };

  const onClickPlusHandler = () => {
    setOpenFormDiag(true);
  };

  const handleCloseFormDiag = (value) => {
    setOpenFormDiag(false);
  };

  const onClickEditHandler = () => {
    setOpenFormDiag(true);
  };

  const onSaveActivityHandler = () => {
    setOpenFormDiag(false);
  };

  return (
    <Fragment>
      <Grid container direction='column' spacing={8}>
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={3}>
            <TextField
              id='project-id'
              select
              label='Project'
              margin='dense'
              fullWidth
              size='small'
              value={projetctId}
              onChange={(event) => selectChangeHandler(event.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {rows.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant='body1'
              className={classes.position}
              color='textPrimary'
            >
              {selectedProject.clientName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant='body1'
              className={classes.position}
              color='textPrimary'
            >
              {selectedProject.dtExpectedCompletion}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Fab
              size='small'
              color='primary'
              aria-label='add'
              className={classes.fab}
              onClick={onClickPlusHandler}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        <Grid item container xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label='Projects table' size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell align='right'>Start</TableCell>
                  <TableCell align='right'>End</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component='th' scope='row'>
                      {row.description}
                    </TableCell>
                    <TableCell>{row.details}</TableCell>
                    <TableCell align='right'>{row.dtStart}</TableCell>
                    <TableCell align='right'>{row.dtEnd}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={onClickEditHandler}
                        aria-label='edit'
                      >
                        <EditIcon aria-label='edit' />
                      </IconButton>
                      <IconButton
                        onClick={onClickDeleteHandler}
                        aria-label='delete'
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <DeleteDialog
        open={openDeleteDiag}
        selectedValue={selectedValue}
        onClose={handleCloseDeleteDiag}
      />
      <ActivityFormDialog
        activity={activity}
        open={openFormDiag}
        onClose={handleCloseFormDiag}
        onSubmitSave={onSaveActivityHandler}
      />
    </Fragment>
  );
};

export default Activities;
