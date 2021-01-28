import React from 'react';
import {
  makeStyles,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  ListSubheader,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import History from '@material-ui/icons/History';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    borderRight: 'none',
  },
  listItemText: {
    fontSize: 14,
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
}));

const mainMenu = [
  {
    icon: <HomeIcon />,
    text: 'Dashboard',
  },
  {
    icon: <WhatshotIcon />,
    text: 'Manage project',
  },
  {
    icon: <SubscriptionsIcon />,
    text: 'Projects',
  },
  {
    icon: <SubscriptionsIcon />,
    text: 'Activits',
  },
];

const secondMenu = [
  {
    icon: <VideoLibrary />,
    text: 'Library',
  },
  {
    icon: <History />,
    text: 'History',
  },
];

const createMenuItems = (confArray, classes) => {
  const result = confArray.map((iConf, index) => {
    return (
      <ListItem key={iConf.text} button classes={{ root: classes.listItem }}>
        <ListItemIcon>{iConf.icon}</ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.listItemText,
          }}
          primary={iConf.text}
        />
      </ListItem>
    );
  });
  return result;
};

const SideMenu = (props) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>{createMenuItems(mainMenu, classes)}</List>
        <Divider />
        <List>
          {createMenuItems(secondMenu, classes)}
          <Divider />
          <Box p={7}>
            <Typography variant='body2'>
              Um texto ai bem looooongo pra fazer quebra de linha!!
            </Typography>
            <Box mt={2}>
              <Button
                startIcon={<AccountCircleIcon />}
                color='secondary'
                variant='outlined'
              >
                Login
              </Button>
            </Box>
          </Box>
          <Divider />
          <ListSubheader>SUB-HEADER</ListSubheader>
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
