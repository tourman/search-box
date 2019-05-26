import React from 'react';

import { Search } from './Search';
import { planets } from './api';

const AppWrapper = props => (<>{props.children}</>);

function App() {
  return (
    <AppWrapper>
      <Search api={planets} />
    </AppWrapper>
  );
}

export default App;
