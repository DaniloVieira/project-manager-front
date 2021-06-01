import { call, put, takeEvery, all } from 'redux-saga/effects';
//import { delay } from 'redux-saga';
import * as actionTypes from '../actionTypes';
import {
  fetchUserById,
  authUserByUsernamePassword,
  getUserLogado,
  login,
  isAuthenticated,
} from '../../services';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// worker Saga
function* authChekcStateAsync(action) {
  try {
    // 1 take token from storage - OK
    // 2 verify token expiration - TODO
    // 3 get user by user id in the token - [manipulate the string] - ok
    // 4 get user json from backend - ok
    // 5 continue
    const respStg = yield call(getUserLogado);
    if (respStg) {
      const userId = respStg.sub.split(',')[0];
      const resp = yield call(fetchUserById, userId);
      const authenticated = yield call(isAuthenticated);
      yield put({
        type: actionTypes.AUTH_SUCCESS,
        payload: { user: resp.data, authenticated },
      });
    }
  } catch (e) {
    console.log('ERRO', '[authChekcStateAsync]', e);
  }
}
// watcher saga
function* watchAuthChekcStateAsync() {
  yield takeEvery(actionTypes.AUTH_CHECK_STATE_START, authChekcStateAsync);
}

// worker Saga
function* authUserAsync(action) {
  let resp;
  try {
    resp = yield call(authUserByUsernamePassword, action.payload.loginData);
    yield call(login, resp.data.token);
    const authenticated = yield call(isAuthenticated);
    yield put({
      type: actionTypes.AUTH_SUCCESS,
      payload: { user: resp.data, authenticated },
    });
  } catch (e) {
    console.log('ERRO', '[authUserAsync]', e);
    yield put({ type: actionTypes.AUTH_FAIL, error: e });
  }
}
// watcher saga
function* watchAuthUserAsync() {
  yield takeEvery(actionTypes.AUTH_START, authUserAsync);
}

// worker Saga
function* fetchUserAsync(action) {
  try {
    const resp = yield call(fetchUserById, action.payload.id);
    yield put({ type: actionTypes.AUTH_SUCCESS, user: resp.data });
  } catch (e) {
    console.log('ERRO', '[fetchUserAsync]');
  }
}
// watcher saga
function* watchFetchUserAsync() {
  yield takeEvery(actionTypes.FETCH_USER_START, fetchUserAsync);
}

// worker Saga
function* incrementAsync() {
  yield delay(3000);
  yield put({ type: actionTypes.INCREMENT_COUNT });
}
// watcher saga
function* watchIncrementAsync() {
  yield takeEvery(actionTypes.INCREMENT_COUNT_START, incrementAsync);
  // yield takeLatest(actionTypes.INCREMENT_COUNT_START, incrementAsync);
}

// worker Saga
function* decrementAsync() {
  yield delay(4000);
  yield put({ type: actionTypes.DECREMENT_COUNT });
}
// watcher saga
function* watchDecrementAsync() {
  yield takeEvery(actionTypes.DECREMENT_COUNT_START, decrementAsync);
  // yield takeLatest(actionTypes.DECREMENT_COUNT_START, decrementAsync);
}

export default function* rootSaga() {
  yield all([
    watchAuthChekcStateAsync(),
    watchAuthUserAsync(),
    watchFetchUserAsync(),
    watchDecrementAsync(),
    watchIncrementAsync(),
  ]);
}

// export default function* rootSaga() {
//   yield [
//     takeEvery(actionTypes.AUTH_START, fetchUserAsync),
//     takeEvery(actionTypes.INCREMENT_COUNT_START, incrementAsync),
//     takeEvery(actionTypes.DECREMENT_COUNT_START, decrementAsync),
//   ];
// }
