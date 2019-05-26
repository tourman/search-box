import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import search from './reducer';
import saga from './saga';
import SearchConnector from './Connector';

const reducers = combineReducers({
  search,
});

function SearchContainer(props) {
  const { api, ...connectorProps } = props;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(saga, { api });

  return (
    <Provider store={store}>
      <SearchConnector {...connectorProps} />
    </Provider>
  );
}

export default SearchContainer;
