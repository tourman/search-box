import React from 'react';
import { Search } from './Search';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(sagas);

function App() {
  return (
    <Provider {...{ store }}>
      <Search />
    </Provider>
  );
}

export default App;
