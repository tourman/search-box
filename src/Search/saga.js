import { call, put, takeLatest, delay } from 'redux-saga/effects';

import * as types from './reducer';
import actions from './actions';

function* request({ api }, { type, payload }) {
  const { request } = payload;
  if (!request) return;
  // Debouncing request
  yield delay(500);
  const response = yield call(api.search, { request });
  yield put(actions.onResponse({ response }));
}

export default function* searchSaga({ api }) {
  yield takeLatest([
    types.SEARCH_REQUEST,
    types.SEARCH_RESET,
  ], request, { api });
};
