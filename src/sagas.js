import { all } from 'redux-saga/effects';

import * as search from './Search/saga';

export default function*() {
  const sagas = [
    ...Object.values(search)
  ];
  const generators = sagas.map(saga => saga());
  yield all(generators);
};
