import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import { authLogout as logout } from '../../store/actions/actions';
import clsx from 'clsx';
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Switch,
  Typography,
  Badge,
  Menu,
  MenuItem,
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
          aria-label='user profile'
          onClick={handleClick}
        >
          <Badge badgeContent={props.count} color='primary'>
            <AccountCircleIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography
          style={{ padding: '5px 5px 5px 10px' }}
          color='textSecondary'
          gutterBottom
          variant='h6'
        >
          {user.firstName}
        </Typography>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default AppTopBar;
