import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

const Content = (props) => {
  const [title, setTitle] = useState('>>>Missing title<<<');

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        title: (t) => setTitle(t),
      });
    }
    return child;
  });

  return (
    <Fragment>
      <Typography variant='h5' color='textPrimary' style={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {childrenWithProps}
    </Fragment>
  );
};

export default Content;
