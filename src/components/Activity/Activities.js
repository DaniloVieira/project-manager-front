import React, {
  useState,
  Fragment,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import {
  makeStyles,
  Grid,
  TextField,
  Typography,
  Fab,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import ActivitiesTable from './ActivitiesTable';
import DeleteDialog from '../../Shared/Components/DeleteDialog/DeleteDialog';
import ActivityFormDialog from './ActivityFormDialog';
import ContentContext from '../../store/context/title-context';

import {
  fetchActivitiesData,
  fetchProjectDomain,
  fetchProjectById,
  saveActivity,
  fetchActivityById,
  deleteActivityById,
} from '../../services';

const useStyles = makeStyles((theme) => ({
  position: {
    marginTop: '25px',
  },
  fab: {
    position: 'relative',
    top: theme.spacing(6),
    left: theme.spacing(0),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}));

const Activities = (props) => {
  const { setTitle } = useContext(ContentContext);
  const { userId } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [onloadError, setOnloadError] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const [rows, setRows] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openDeleteDiag, setOpenDeleteDiag] = useState(false);
  const [openFormDiag, setOpenFormDiag] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [projectId, setProjectId] = useState(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [disabled, setDisabled] = useState(true);
  const [activity, setActivity] = useState(null);
  const [selectedProject, setSelectedProject] = useState({
    description: '',
    clientName: '',
    dtExpectedCompletion: '',
  });

  const errorSnackbar = useCallback(() => {
    const result = enqueueSnackbar('Error on load records', {
      variant: 'error',
    });
    setOnloadError(result ? true : false);
    setBackDrop(false);
  }, [enqueueSnackbar]);

  const fetchActivities = useCallback(() => {
    if (projectId) {
      setBackDrop(true);
      fetchActivitiesData(
        (resp) => {
          setRows(resp.data.value);
          setBackDrop(false);
        },
        errorSnackbar,
        projectId,
        userId,
        page + 1,
        pageSize
      );
    }
  }, [errorSnackbar, projectId, page, pageSize, userId]);

  useEffect(() => {
    if (!onloadError) {
      fetchProjectDomain(
        (resp) => {
          const projectsDomain = resp.data;
          setProjects(projectsDomain);
          // setProjectId(projectsDomain[0].value);
          // if (projectsDomain.length > 1) {
          //   setDisabled(false);
          // }
        },
        errorSnackbar,
        userId
      );
    }
  }, [onloadError, errorSnackbar, userId]);

  useEffect(() => {
    if (projectId) {
      fetchProjectById(
        (resp) => {
          const projectData = resp.data.value;
          setSelectedProject(projectData);
        },
        errorSnackbar,
        projectId
      );
    }
  }, [projectId, errorSnackbar]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    // props.setTitleOnLoad();
    setTitle('Activities');
  });

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
    setSelectedValue(null);
  };

  const handleConfirmDeleteDiag = (value) => {
    deleteActivityById(
      (resp) => {
        fetchActivities();
        setOpenDeleteDiag(false);
        setSelectedValue(null);
        enqueueSnackbar(resp.data.message, {
          variant: 'success',
        });
      },
      errorSnackbar,
      selectedValue
    );
  };

  const onClickDeleteHandler = (id) => {
    setOpenDeleteDiag(true);
    setSelectedValue(id);
  };

  const onClickPlusHandler = () => {
    setActivity({
      id: null,
      description: '',
      details: '',
      dtStart: null,
      dtEnd: null,
      userId: userId,
      projectId: projectId,
    });
    setOpenFormDiag(true);
  };

  const handleCloseFormDiag = (value) => {
    setOpenFormDiag(false);
    setActivity(null);
  };

  const onClickEditHandler = (id) => {
    fetchActivityById(
      (resp) => {
        const selected = resp.data.value;
        setActivity({
          ...selected,
        });
        setOpenFormDiag(true);
      },
      errorSnackbar,
      id
    );
  };

  const formInputChangeHandler = (value, identifier) => {
    setActivity({ ...activity, [identifier]: value });
  };

  const onSaveActivityHandler = () => {
    setBackDrop(true);
    saveActivity(
      (resp) => {
        setOpenFormDiag(false);
        fetchActivities();
        setActivity(null);
        setBackDrop(false);
        enqueueSnackbar(resp.data.message, {
          variant: 'success',
        });
      },
      (err) => {
        setBackDrop(false);
        enqueueSnackbar(err, {
          variant: 'danger',
        });
      },
      {
        ...activity,
      }
    );
  };

  const projectInfo = (label, value) => (
    <Typography
      variant='body1'
      className={classes.position}
      color='textPrimary'
    >
      {label}: {value}
    </Typography>
  );

  const table = projectId ? (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Fab
          size='small'
          color='primary'
          aria-label='add'
          // className={classes.fab}
          onClick={onClickPlusHandler}
        >
          <AddIcon />
        </Fab>
      </Grid>
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
  ) : (
    <Container maxWidth='sm'>
      <Typography
        style={{ marginTop: '50%' }}
        variant='h4'
        color='textSecondary'
      >
        Select a project
      </Typography>
    </Container>
  );

  return (
    <Fragment>
      <Grid container direction='column' spacing={8}>
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={4}>
            {/* <TextField
              id='project-id'
              select
              label='Project'
              margin='dense'
              fullWidth
              size='small'
              value={projectId}
              onChange={(event) => selectChangeHandler(event)}
              // disabled={disabled}
              // SelectProps={{
              //   native: true,
              // }}
            >
              {projects.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField> */}
            <FormControl className={classes.formControl}>
              <InputLabel id='project-id-select-label'>Project</InputLabel>
              <Select
                labelId='project-id-select-label'
                id='project-id'
                margin='dense'
                fullWidth
                size='small'
                value={projectId}
                onChange={selectChangeHandler}
                // disabled={disabled}
              >
                {projects.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {projectInfo('Client', selectedProject.clientName)}
          </Grid>
          <Grid item xs={4}>
            {projectInfo('Completion', selectedProject.dtExpectedCompletion)}
          </Grid>
        </Grid>

        {table}
      </Grid>
      <DeleteDialog
        open={openDeleteDiag}
        onCancel={handleCloseDeleteDiag}
        onConfirm={handleConfirmDeleteDiag}
      />
      {activity && (
        <ActivityFormDialog
          activity={activity}
          open={openFormDiag}
          onClose={handleCloseFormDiag}
          onSubmitSave={onSaveActivityHandler}
          inputChangeHandler={formInputChangeHandler}
        />
      )}
      <Backdrop className={classes.backdrop} open={backDrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTitleOnLoad: () =>
      //dispatch({ type: actionTypes.SET_TITLE, title: 'Activities' }),
      dispatch(actions.setTitle('Activities')),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Activities);
