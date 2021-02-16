import React, { useState } from 'react';
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

const Layout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <AppTopBar open={open} toggle={handleDrawerToggle} {...props} />
      <Box display='flex'>
        {/* <Hidden mdDown> */}
        <SideMenu open={open} {...props} />
        {/* </Hidden> */}
        <Content>{props.children}</Content>
      </Box>
    </div>
  );
};

export default Layout;
