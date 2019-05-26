import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const styles = makeStyles({
  input: {
    marginLeft: '8px',
    flex: 2,
  },
});

function Input(props, ref) {
  const { autoFocus, error, string, placeholder } = props;
  const classes = styles();
  return (
    <InputBase
      className={classes.input}
      inputRef={ref}
      error={error}
      autoFocus={autoFocus}
      value={string}
      placeholder={placeholder}
      onChange={e => {
        const { value } = e.target;
        props.actions.onChange({ value });
      }}
    />
  );
};

export default React.forwardRef(Input);
