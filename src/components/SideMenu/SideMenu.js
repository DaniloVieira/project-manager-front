import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Fade,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import History from '@material-ui/icons/History';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12) + 1,
    },
  },
  drawerPaper: {
    // width: drawerWidth,
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

const createMenuItems = (confArray, classes, show) => {
  const result = confArray.map((iConf, index) => {
    return (
      <ListItem key={iConf.text} button classes={{ root: classes.listItem }}>
        <ListItemIcon>{iConf.icon}</ListItemIcon>
        <Fade in={show}>
          <ListItemText
            classes={{
              primary: classes.listItemText,
            }}
            primary={iConf.text}
          />
        </Fade>
      </ListItem>
    );
  });
  return result;
};

const SideMenu = (props) => {
  const classes = useStyles();
  console.log('[open]', props.open);
  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>{createMenuItems(mainMenu, classes, props.open)}</List>
        <Divider />
        <List>
          {createMenuItems(secondMenu, classes, props.open)}
          <Divider />

          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
