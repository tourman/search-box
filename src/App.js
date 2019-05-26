import React from 'react';

import { Search } from './Search';
import { planets } from './api';

const AppWrapper = props => (<>{props.children}</>);

function App() {
  return (
    <AppWrapper>
      <Search api={planets} autoFocus={true} />
    </AppWrapper>
  );
}

export default App;
