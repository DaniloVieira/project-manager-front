import React from 'react';
import { makeStyles, Box, Hidden, Toolbar } from '@material-ui/core';
import AppTopBar from '../../components/AppTopBar/AppTopBar';
import SideMenu from '../../components/SideMenu/SideMenu';
import Content from '../../components/Content/Content';

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.primary.main,
    // padding: theme.spacing(2),
    height: '100vh',
    backgroundColor: theme.palette.background.dark,
  },
}));

const title = () => {};

const Layout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppTopBar {...props}></AppTopBar>
      <Box display='flex'>
        <Hidden mdDown>
          <SideMenu {...props}></SideMenu>
        </Hidden>
        <Box p={8}>
          <Toolbar />
          <Content>{props.children}</Content>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
