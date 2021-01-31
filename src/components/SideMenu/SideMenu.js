import React from 'react';
import { NavLink } from 'react-router-dom';
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
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import CodeIcon from '@material-ui/icons/Code';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import History from '@material-ui/icons/History';

const drawerWidth = 170;

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
  listItemIcon: {
    minWidth: '30px',
  },
}));

const mainMenu = [
  {
    icon: <DashboardIcon />,
    text: 'Dashboard',
    link: '/',
  },
  {
    id: 1,
    icon: <AccountTreeIcon />,
    text: 'Manage project',
    link: '/manage_projects',
  },
  {
    icon: <DynamicFeedIcon />,
    text: 'Projects',
    link: '/projects',
  },
  {
    icon: <CodeIcon />,
    text: 'Activities',
    link: '/activities',
  },
];

const secondMenu = [
  {
    icon: <VideoLibrary />,
    text: 'Library',
    link: '/videos',
  },
  {
    icon: <History />,
    text: 'History',
    link: '/',
  },
];

const createMenuItems = (confArray, classes, show) => {
  const result = confArray.map((iConf, index) => {
    return (
      <ListItem
        key={iConf.text}
        button
        classes={{ root: classes.listItem }}
        component={NavLink}
        to={iConf.link}
      >
        <ListItemIcon classes={{ root: classes.listItemIcon }}>
          {iConf.icon}
        </ListItemIcon>
        <Fade in={show}>
          <ListItemText
            ref={React.createRef()}
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
      ref={React.createRef()}
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
