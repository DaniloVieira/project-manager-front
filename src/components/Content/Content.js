import React, { useState } from 'react';
import { connect } from 'react-redux';
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
  // const [title, setTitle] = useState('>>>Missing title<<<');

  // const setTheTitle = (t) => setTitle(t);

  // const childrenWithProps = React.Children.map(props.children, (child) => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, {
  //       titleSet: setTheTitle,
  //     });
  //   }
  //   return child;
  // });

  return (
    <Box p={4} style={{ width: '100%', overflowY: 'scroll' }}>
      <Toolbar />
      <div className={classes.titleSection}>
        <Typography
          variant='h5'
          color='textPrimary'
          style={{ fontWeight: 600 }}
        >
          {props.title}
        </Typography>
      </div>
      <Divider variant='middle' />
      {/* <div className={classes.contentSection}>{childrenWithProps}</div> */}
      <div className={classes.contentSection}>{props.children}</div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.reducer.title,
  };
};

export default connect(mapStateToProps)(Content);
