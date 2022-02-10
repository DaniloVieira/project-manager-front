import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/actions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CachedIcon from '@material-ui/icons/Cached';
import { fetchUserById } from '../../services/UserService';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import ContentContext from '../../store/context/title-context';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '350px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const ResultCard = (props) => {
  const classes = useStyles();
  const { result } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color='textSecondary' gutterBottom variant='h4'>
          {result}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TestContainer = (props) => {
  const { actionComponent, result, item = false } = props;
  return (
    // <Fragment>
    <Grid item={item} container xs={12} spacing={8}>
      <Grid item container xs={1}>
        {actionComponent}
      </Grid>
      <Grid item xs={11}>
        <ResultCard result={result} />
      </Grid>
    </Grid>
    // </Fragment>
  );
};

const Examples = (props) => {
  // const userId = useSelector((state) => state.auth.userId);
  // const [loadingColor, setloadingColor] = useState('primary');
  // const [loading, setloading] = useState(false);
  // const { loading, loadingColor } = props;
  //const onDecrementCount = useDispatch(actions.decrementCount());
  // const fetcUser = (id) => {
  //   fetchUserById(id)
  //     .then((resp) => {
  //       setSyncUser(resp.data?.value);
  //     })
  //     .catch((err) => {
  //       console.log('fetchUserById', '[ERROR]');
  //     });
  // };
  const classes = useStyles();
  const { setTitle } = useContext(ContentContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const exampleUser = useSelector((state) => state.exampleReducer.user);
  const count = useSelector((state) => state.exampleReducer.count);
  const loading = useSelector((state) => state.exampleReducer.loading);
  const loadingColor = useSelector(
    (state) => state.exampleReducer.loadingColor
  );
  const userLoading = useSelector((state) => state.exampleReducer.userLoading);
  const [syncUser, setSyncUser] = useState(null);
  const bull = <span className={classes.bullet}>•</span>;

  const asyncSagaFunction = () => dispatch(actions.fetchUserExample(1));

  const increment = () => {
    dispatch(actions.incrementCount());
  };

  const decrement = () => {
    dispatch(actions.decrementCount());
  };

  useEffect(() => {
    setTitle('Examples');
  });

  const fetchUser = async (id) => {
    try {
      const resp = await fetchUserById(id);
      setSyncUser(resp.data.value);
    } catch (e) {
      console.log('fetchUserById', '[ERROR]');
    }
  };

  return (
    <Grid item container xs={12} spacing={8}>
      <TestContainer
        item
        actionComponent={
          <Grid item container xs={12}>
            <Grid direction='column' container item xs={6}>
              <Fab
                color='primary'
                size='small'
                aria-label='add'
                onClick={increment}
              >
                <AddIcon />
              </Fab>
              <Fab
                color='secondary'
                size='small'
                aria-label='add'
                onClick={decrement}
              >
                <RemoveIcon />
              </Fab>
            </Grid>
            <Grid item xs={6}>
              {loading ? <CircularProgress color={loadingColor} /> : null}
            </Grid>
          </Grid>
        }
        result={`Count: ${count}`}
      />

      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <ResultCard
          result={`Current User: ${user ? user.firstName : 'no user'}`}
        />
      </Grid>

      <TestContainer
        item
        actionComponent={
          <Fab
            aria-label='add'
            onClick={asyncSagaFunction}
            className={classes.spiningAnimation}
          >
            <CachedIcon />
          </Fab>
        }
        result={`Async User: ${
          exampleUser ? exampleUser.firstName : 'no user'
        }`}
      />

      <TestContainer
        item
        actionComponent={
          <Fab aria-label='add' onClick={() => fetchUser(1)}>
            <CachedIcon />
          </Fab>
        }
        result={`Sync User: ${syncUser ? syncUser.firstName : 'no user'}`}
      />
    </Grid>
  );
};

export default Examples;
