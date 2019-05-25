import React from 'react';

function Input(props, ref) {
  return (
    <input
      ref={ref}
      value={props.string}
      onChange={e => {
        const { value } = e.target;
        props.actions.onChange({ value });
      }}
      onClick={e => props.actions.onClick(e)}
    />
  );
};

export default React.forwardRef(Input);
