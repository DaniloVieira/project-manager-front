import React, { useState } from 'react';
import { Box, Divider, Toolbar, Typography } from '@material-ui/core';

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
    <Box p={8} style={{ backgroundColor: 'red' }}>
      <Toolbar />
      <Typography variant='h5' color='textPrimary' style={{ fontWeight: 600 }}>
        {title}
        <Divider />
      </Typography>
      {childrenWithProps}
    </Box>
  );
};

export default Content;
