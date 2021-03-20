import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import clsx from 'clsx';
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Switch,
  Typography,
  Badge,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
  },
  // icons: {
  //   paddingRight: theme.spacing(5),
  //   paddingLeft: theme.spacing(6),
  // },
  rotate: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  open: {
    transform: 'rotate(-90deg)',
  },
  closed: {
    transform: 'rotate(0)',
  },
  grow: {
    flexGrow: 1,
  },
}));

const AppTopBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar color='inherit' position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => props.toggle()}
          edge='start'
          aria-label='menu'
        >
          <MenuIcon
            className={clsx(classes.rotate, {
              [classes.open]: props.open,
              [classes.closed]: !props.open,
            })}
          />
        </IconButton>
        <Typography color='textPrimary' variant='h5'>
          Project manager
        </Typography>
        <div className={classes.grow} />
        <Switch
          value={props.darkMode}
          onChange={() => props.setDarkMode(!props.darkMode)}
        />

        <IconButton
          color='secondary'
          variant='outlined'
          aria-label='add to shopping cart'
        >
          <Badge badgeContent={props.count} color='primary'>
            <AccountCircleIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.reducer.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCount: () => dispatch({ type: actionTypes.INCREMENT_COUNT }),
    onDecrementCount: () => dispatch({ type: actionTypes.DECREMENT_COUNT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTopBar);
