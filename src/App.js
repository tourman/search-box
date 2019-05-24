import React from 'react';
import { Search } from './Search';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

function App() {
  return (
    <Provider {...{ store }}>
      <Search />
    </Provider>
  );
}

export default App;
