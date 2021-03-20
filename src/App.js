import React, { useState, useEffect } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import * as actions from './store/actions/actions';

// import Home from './Home';
import Layout from './hoc/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Videos from './components/Videos/Videos';
import Activities from './components/Activity/Activities';
import Projects from './components/Projects/Projects';
import ManageProjects from './components/ManageProjects/ManageProjects';
import Examples from './components/Example/Example';
import Login from './components/Login/Login';

function App(props) {
  const { isAuthenticated, onTryAutoSignup } = props;
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

  // const routes = (
  //   <Switch>
  //     <Route path="/auth" component={Auth}/>
  //     <Route path="/" exact component={BurgerBuilder}/>
  //     <Redirect to="/"/>
  //   </Switch>
  // );

  // if(this.props.isAuthenticated){
  //   routes = (
  //     <Switch>
  //       <Route path="/checkout" component={asyncCheckout}/>
  //       <Route path="/orders" component={Orders}/>
  //       <Route path="/logout" component={Logout}/>
  //       <Route path="/auth" component={Auth}/>
  //       <Route path="/" exact component={BurgerBuilder}/>
  //       <Redirect to="/"/>
  //     </Switch>
  //   )
  // }
  // return (
  //   <div>
  //     <Layout>
  //         {routes}
  //     </Layout>
  //   </div>
  // );

  useEffect(() => {
    if (!isAuthenticated) {
      onTryAutoSignup();
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          {isAuthenticated ? (
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              {/* <BrowserRouter> */}
              <Switch>
                <Route path='/videos' component={Videos} />
                <Route path='/activities' component={Activities} />
                <Route path='/projects' component={Projects} />
                <Route path='/manage_projects' component={ManageProjects} />
                <Route path='/examples' component={Examples} />
                <Route path='/dashboard' component={Dashboard} />
                <Redirect to='/dashboard' />
              </Switch>
              {/* </BrowserRouter> */}
            </Layout>
          ) : (
            <Switch>
              <Route path='/login' component={Login} />
              <Redirect to='/login' />
            </Switch>
          )}
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
      {/* <Home darkMode={darkMode} setDarkMode={setDarkMode}></Home> */}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
