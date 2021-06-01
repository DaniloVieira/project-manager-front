import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ContentContext from '../../store/context/title-context';

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
  const [title, setTitle] = useState('[>>> THE TITLE IS MISSING 1 <<<]');

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
      <ContentContext.Provider
        value={{
          title,
          setTitle,
        }}
      >
        <Toolbar />
        <div className={classes.titleSection}>
          <Typography
            variant='h5'
            color='textPrimary'
            style={{ fontWeight: 600 }}
          >
            {/* {props.title} */}
            {title}
          </Typography>
        </div>
        <Divider variant='middle' />
        {/* <div className={classes.contentSection}>{childrenWithProps}</div> */}
        <div className={classes.contentSection}>{props.children}</div>
      </ContentContext.Provider>
    </Box>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     title: state.reducer.title,
//   };
// };
// export default connect(mapStateToProps)(Content);

export default Content;
