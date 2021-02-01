import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  titleSection: {
    margin: theme.spacing(2),
  },
  contentSection: {
    margin: theme.spacing(2, 3),
  },
}));

const Content = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState('>>>Missing title<<<');
  // useEffect(() => {
  //   alert('Content useefect');
  // });

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        title: (t) => setTitle(t),
      });
    }
    return child;
  });

  return (
    <Box p={4} style={{ width: '100%' }}>
      <Toolbar />
      <div className={classes.titleSection}>
        <Typography
          variant='h5'
          color='textPrimary'
          style={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
      </div>
      <Divider variant='middle' />
      <div className={classes.contentSection}>{childrenWithProps}</div>
    </Box>
  );
};

export default Content;
