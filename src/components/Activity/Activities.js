import React, { useEffect, useState, useCallback, Fragment } from 'react';
import {
  makeStyles,
  Grid,
  TextField,
  Typography,
  Fab,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import ActivitiesTable from './ActivitiesTable';
import DeleteDialog from '../../Shared/Components/DeleteDialog/DeleteDialog';
import ActivityFormDialog from './ActivityFormDialog';

import { fetchActivitiesData, fetchProjectDomain } from '../../services';

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [onloadError, setOnloadError] = useState(false);
  const [contributorId, setContributorId] = useState(1);
  const [rows, setRows] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openDeleteDiag, setOpenDeleteDiag] = useState(false);
  const [openFormDiag, setOpenFormDiag] = useState(false);
  const [selectedValue, setSelectedValue] = useState('test');
  const [projetctId, setProjectId] = useState(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [disabled, setDisabled] = useState(true);
  const [activity, setActivity] = useState({
    id: null,
    description: null,
    details: null,
    dtStart: null,
    dtEnd: null,
  });
  const [selectedProject, setSelectedProject] = useState({
    description: 'Descrition',
    clientName: 'Client Name',
    dtExpectedCompletion: 'Conclusion Date',
  });

  const errorSnackbar = useCallback(() => {
    const result = enqueueSnackbar('Error on load records', {
      variant: 'error',
    });
    setOnloadError(result ? true : false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (!onloadError) {
      fetchProjectDomain(
        (resp) => {
          const projectsData = resp.data;
          setProjects(projectsData);
          setProjectId(projectsData[0].value);
          if (projectsData.length > 1) {
            setDisabled(false);
          }
        },
        errorSnackbar,
        contributorId
      );
    }
  }, [onloadError, contributorId, errorSnackbar]);

  useEffect(() => {
    fetchActivitiesData(
      (resp) => {
        setRows(resp.data.value);
      },
      errorSnackbar,
      projetctId,
      page + 1,
      pageSize,
      contributorId
    );
  }, [projetctId, page, pageSize, contributorId, errorSnackbar]);

  const selectChangeHandler = (event) => {
    setProjectId(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 10));
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
              onChange={(event) => selectChangeHandler(event)}
              disabled={disabled}
              SelectProps={{
                native: true,
              }}
            >
              {projects.map((option) => (
                <option key={option.value} value={option.value}>
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
          <ActivitiesTable
            rows={rows}
            onClickEditHandler={onClickEditHandler}
            onClickDeleteHandler={onClickDeleteHandler}
            page={page}
            pageSize={pageSize}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangePageSize}
          />
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
