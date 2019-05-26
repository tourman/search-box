import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import search from './reducer';
import saga from './saga';

const reducers = combineReducers({
  search,
});

export default function container(Search) {
  return function SearchContainer(parentProps) {
    const { api, ...props } = parentProps;
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      reducers,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(saga, { api });

    return (
      <Provider store={store}>
        <Search {...props} />
      </Provider>
    );
  }
};
