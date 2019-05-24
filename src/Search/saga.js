import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './reducer';
import actions from './actions';
import * as api from './api';

function* request({ type, payload }) {
  const response = yield call(api.search, payload);
  yield put(actions.onResponse({ response }));
}

export default function* search() {
  yield takeLatest(types.SEARCH_REQUEST, request);
};
