import * as actionTypes from '../actionTypes';

export const incrementCount = () => {
  return {
    type: actionTypes.INCREMENT_COUNT_START,
  };
};

export const decrementCount = () => {
  return {
    type: actionTypes.DECREMENT_COUNT_START,
  };
};

export const fetchUserExample = (id) => {
  return {
    type: actionTypes.EXAMPLE_AUTH_START,
    payload: { id },
  };
};

export const setTitle = (title) => {
  return {
    type: actionTypes.SET_TITLE,
    title,
  };
};

export const fetchUser = (id) => {
  return {
    type: actionTypes.FETCH_USER_START,
    payload: { id },
  };
};

export const authStart = (loginData) => {
  return {
    type: actionTypes.AUTH_START,
    payload: { loginData },
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE_START,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
