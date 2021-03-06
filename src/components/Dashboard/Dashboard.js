import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import { Grid, Box } from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import ContentContext from '../../store/context/title-context';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = (props) => {
  const { setTitle } = useContext(ContentContext);
  useEffect(() => {
    // props.setTitleOnLoad('Dashboard');
    setTitle('Dashboard');
  });

  return (
    <Grid container spacing={4}>
      {/* {videos.map((item, index) => ( */}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box style={{ border: '1px solid #d5d5d5' }}>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              // width={500}
              // height={300}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend
                wrapperStyle={{
                  position: 'relative',
                  top: -25,
                }}
              />
              <Line
                type='monotone'
                dataKey='pv'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
              <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box style={{ border: '1px solid #d5d5d5' }}>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              // width={500}
              // height={300}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend
                wrapperStyle={{
                  position: 'relative',
                  top: -25,
                }}
              />
              <Bar dataKey='pv' fill='#8884d8' />
              <Bar dataKey='uv' fill='#82ca9d' />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box style={{ border: '1px solid #d5d5d5', height: '300px' }}></Box>
      </Grid> */}
    </Grid>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setTitleOnLoad: (t) => dispatch({ type: actionTypes.SET_TITLE, title: t }),
//   };
// };
// export default connect(null, mapDispatchToProps)(Dashboard);

export default Dashboard;
