import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

// import Home from './Home';
import Layout from './hoc/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Videos from './components/Videos/Videos';
import Activity from './components/Activity/Activity';
import Projects from './components/Projects/Projects';
import ManageProjects from './components/ManageProjects/ManageProjects';

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
        <Switch>
          <Route path='/videos' component={Videos} />
          <Route path='/activities' component={Activity} />
          <Route path='/projects' component={Projects} />
          <Route path='/manage_projects' component={ManageProjects} />
          <Route path='/' component={Dashboard} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
