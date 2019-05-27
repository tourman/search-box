import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const styles = makeStyles({
  wrapper: {
    padding: '4px',
    display: 'flex',
    position: 'relative',
  },
});

function SearchWrapper(props, ref) {
  const classes = styles();
  return (
    <Box m={1}>
      <Paper ref={ref} className={classes.wrapper}>
        {props.children}
      </Paper>
    </Box>
  );
};

export default React.forwardRef(SearchWrapper);
