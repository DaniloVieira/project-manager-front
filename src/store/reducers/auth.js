import { updateObject } from '../../Shared/utility';
import * as actionTypes from '../actionTypes';
import { login, logout } from '../../services/auth'; // TODO import as a service
import { useHistory } from 'react-router-dom';

const initialState = {
  token: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
  user: null,
  isAuthenticated: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  const usr = updateObject(state, {
    error: null,
    loading: false,
    user: action.payload.user,
    isAuthenticated: action.payload.authenticated,
  });
  return usr;
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  logout();
  const updated = updateObject(state, { token: null, user: null });
  return updated;
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
