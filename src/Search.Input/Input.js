import React from 'react';

function Input(props, ref) {
  const { autoFocus } = props;
  return (
    <input
      ref={ref}
      autoFocus={autoFocus}
      value={props.string}
      onChange={e => {
        const { value } = e.target;
        props.actions.onChange({ value });
      }}
    />
  );
};

export default React.forwardRef(Input);
