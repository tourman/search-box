import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const styles = makeStyles({
  wrapper: {
    flex: 1,
    minWidth: 200,
  },
  error: {
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'left',
  },
});

const visibilityMap = new Map()
  .set(true,  'block')
  .set(false, 'none')
;

export default function ErrorIndicator(props) {
  const { error } = props;
  const display = visibilityMap.get(!!error);
  const classes = styles();
  return (
    <Box m={1} style={{ display }} className={classes.wrapper}>
      <Chip
        icon={<ErrorIcon />}
        label={error}
        className={classes.error}
        color="secondary"
      />
    </Box>
  );
};
