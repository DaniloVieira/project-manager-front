import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Switch,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideoCall from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVert from '@material-ui/icons/MoreVert';

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
  console.log('[AppTopBar]', props);
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
        <IconButton>
          <VideoCall />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
        <IconButton
          color='secondary'
          variant='outlined'
          aria-label='add to shopping cart'
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
