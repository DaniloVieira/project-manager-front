import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';

import { videos } from '../../AuxData/Videos';

const Videos = (props) => {
  //props.title('Videos');
  console.log(videos);
  return (
    <Grid container spacing={4}>
      {videos.map((item, index) => (
        <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
          <Box>
            <img style={{ width: '100%' }} alt={item.title} src={item.thumb} />
            <Box>
              <Typography
                style={{ fontWeight: 600 }}
                gutterBottom
                variant='body1'
                color='textPrimary'
              >
                {item.title}
              </Typography>
              <Typography display='block' variant='body2' color='textSecondary'>
                {item.channel}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {`${item.views} • ${item.date}`}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Videos;
