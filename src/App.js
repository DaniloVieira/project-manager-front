import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// import Home from './Home';
import Layout from './hoc/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Videos from './components/Videos/Videos';
import Activities from './components/Activity/Activities';
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
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Switch>
            <Route path='/videos' component={Videos} />
            <Route path='/activities' component={Activities} />
            <Route path='/projects' component={Projects} />
            <Route path='/manage_projects' component={ManageProjects} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </Layout>
      </SnackbarProvider>
      {/* <Home darkMode={darkMode} setDarkMode={setDarkMode}></Home> */}
    </ThemeProvider>
  );
}

export default App;
