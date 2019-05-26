import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MaterialList from '@material-ui/core/List';

const styles = makeStyles({
  wrapper: {
    position: 'absolute',
    top: 60,
    zIndex: 1,
    padding: '0 40px',
  },
  list: {
    overflowY: 'auto',
    maxHeight: 300,
    paddingRight: 8
  },
});

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function List(props) {
  const classes = styles();
  const visibility = visibilityMap.get(props.available);
  return (
    <Container
      maxWidth="md"
      className={classes.wrapper}
      style={{ visibility }}
    >
      <Paper>
        <MaterialList className={classes.list}>
          {props.children}
        </MaterialList>
      </Paper>
    </Container>
  );
};
