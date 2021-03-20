import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
  CardActions,
  Button,
  CircularProgress,
} from '@material-ui/core';

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

const Examples = (props) => {
  const classes = useStyles();
  const [syncUser, setSyncUser] = useState(null);
  // const [loadingColor, setloadingColor] = useState('primary');
  // const [loading, setloading] = useState(false);
  const bull = <span className={classes.bullet}>•</span>;

  const { loading, loadingColor } = props;

  const increment = () => {
    // setloadingColor('primary');
    // setloading(true);
    props.onIncrementCount();
  };

  const decrement = () => {
    // setloadingColor('secondary');
    // setloading(true);
    props.onDecrementCount();
  };

  useEffect(() => {
    props.setTitleOnLoad('Examples');
  });

  const fetcUser = (id) => {
    fetchUserById(id)
      .then((resp) => {
        setSyncUser(resp.data?.value);
      })
      .catch((err) => {
        console.log('fetchUserById', '[ERROR]');
      });
  };

  const resultCard = (value) => (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          // className={classes.title}
          color='textSecondary'
          gutterBottom
          variant='h4'
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid item container xs={12} spacing={8}>
      <Grid item container xs={1}>
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
      <Grid item xs={11}>
        {resultCard(props.count)}
      </Grid>

      <Grid item xs={1}>
        <Fab
          aria-label='add'
          onClick={props.asyncSagaFunction}
          className={classes.spiningAnimation}
        >
          <CachedIcon />
        </Fab>
      </Grid>
      <Grid item xs={11}>
        {resultCard('User: ' + (props.user ? props.user.firstName : 'no user'))}
      </Grid>
      <Grid item xs={1}>
        <Fab aria-label='add' onClick={() => fetcUser(1)}>
          <CachedIcon />
        </Fab>
      </Grid>
      <Grid item xs={11}>
        {resultCard(
          'Sync User: ' + (syncUser ? syncUser.firstName : 'no user')
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    user: state.auth.user,
    count: state.exampleReducer.count,
    loading: state.exampleReducer.loading,
    loadingColor: state.exampleReducer.loadingColor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCount: () => dispatch(actions.incrementCount()),
    onDecrementCount: () => dispatch(actions.decrementCount()),
    setTitleOnLoad: (t) => dispatch(actions.setTitle(t)),
    asyncSagaFunction: () => dispatch(actions.fetchUser(1)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Examples);
