import { call, put, takeEvery, all } from 'redux-saga/effects';
//import { delay } from 'redux-saga';
import * as actionTypes from '../store/actionTypes';
import { fetchUserById } from '../services';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// worker Saga
function* fetchUserAsync(action) {
  try {
    const resp = yield call(fetchUserById, action.payload.id);
    yield put({ type: actionTypes.AUTH_SUCCESS, user: resp.data.value });
  } catch (e) {
    console.log('ERRO', '[fetchUserAsync]');
  }
}

// worker Saga
function* incrementAsync() {
  yield delay(3000);
  yield put({ type: actionTypes.INCREMENT_COUNT });
}

// worker Saga
function* decrementAsync() {
  yield delay(4000);
  yield put({ type: actionTypes.DECREMENT_COUNT });
}

// watcher saga
function* watchFetchUserAsync() {
  yield takeEvery(actionTypes.AUTH_START, fetchUserAsync);
}

// watcher saga
function* watchIncrementAsync() {
  yield takeEvery(actionTypes.INCREMENT_COUNT_START, incrementAsync);
  // yield takeLatest(actionTypes.INCREMENT_COUNT_START, incrementAsync);
}

// watcher saga
function* watchDecrementAsync() {
  yield takeEvery(actionTypes.DECREMENT_COUNT_START, decrementAsync);
  // yield takeLatest(actionTypes.DECREMENT_COUNT_START, decrementAsync);
}

export default function* rootSaga() {
  yield all([
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
