import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  Grid,
  Button,
  TextField,
  Paper,
  withTheme,
  LinearProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as actions from '../../store/actions/actions';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10%',
  },
  root: {
    maxWidth: '350px',
    background: 'white',
    padding: '0px 20px',
  },
  alert: {
    maxWidth: '350px',
    marginTop: '20px',
    minHeight: '100px',
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const { authenticate, loading, error } = props;
  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  });
  const inputHandleChange = (value, identifier) =>
    setLoginData({ ...loginData, [identifier]: value });

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(loginData);
  };
  return (
    <div className={classes.container}>
      <div>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Paper elevation={3} className={classes.root}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  id='username'
                  label='username'
                  margin='dense'
                  fullWidth
                  size='small'
                  value={loginData['username']}
                  disable={loading}
                  onChange={(event) =>
                    inputHandleChange(event.target.value, 'username')
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='password'
                  id='password'
                  label='Password'
                  margin='dense'
                  fullWidth
                  size='small'
                  value={loginData['password']}
                  disable={loading}
                  onChange={(event) =>
                    inputHandleChange(event.target.value, 'password')
                  }
                />
              </Grid>
              <Grid item xs={12} container justify='flex-end'>
                <Button type='submit' color='primary' disable={loading}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
        <div className={classes.alert}>
          <h4>
            {loading && (
              <div>
                <p>loading...</p>
                <LinearProgress color='secondary' />
              </div>
            )}
          </h4>
          {error && (
            <Alert severity='error'>
              <AlertTitle>Longin failed.</AlertTitle>Check username and
              password.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (loginData) => dispatch(actions.authStart(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
