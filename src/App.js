import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Search } from './Search';
import { planets } from './api';

function AppWrapper(props) {
  return (
    <Box m={2}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        {props.children}
      </Container>
    </Box>
  );
}

function App() {
  return (
    <AppWrapper>
      <Search api={planets} autoFocus={true} placeholder="Try to search planets..." />
    </AppWrapper>
  );
}

export default App;
