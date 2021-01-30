import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import Home from './Home';
import Layout from './hoc/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Videos from './components/Dashboard/Videos';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      type: darkMode ? 'dark' : 'light',
      // primary: {
      //   main: '#f44336',
      // },
      // secondary: {
      //   main: '#3f51b5',
      // },
      background: {
        default: darkMode ? '#232323' : '#e6e6e6',
        dark: darkMode ? '#181818' : '#f4f6f8',
        paper: darkMode ? '#232323' : '#e6e6e6',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <Home darkMode={darkMode} setDarkMode={setDarkMode}></Home> */}
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Dashboard />
        {/* <Videos /> */}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
