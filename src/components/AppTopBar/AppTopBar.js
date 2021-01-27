import React from 'react';
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
  icons: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(6),
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
        <IconButton edge='start' className={classes.icons} aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Typography color='textPrimary' variant='h5'>
          Project manager
        </Typography>
        <div className={classes.grow} />
        <Switch
          value={props.darkMode}
          onChange={() => props.setDarkMode(!props.darkMode)}
          className={classes.icons}
        />
        <IconButton className={classes.icons}>
          <VideoCall />
        </IconButton>
        <IconButton className={classes.icons}>
          <AppsIcon />
        </IconButton>
        <IconButton className={classes.icons}>
          <MoreVert />
        </IconButton>
        <Button
          startIcon={<AccountCircleIcon />}
          color='secondary'
          variant='outlined'
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
