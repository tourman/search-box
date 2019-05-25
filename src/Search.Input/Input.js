import React from 'react';

function Input(props, ref) {
  return (
    <input
      ref={ref}
      value={props.string}
      onChange={e => {
        const request = e.target.value;
        props.actions.onRequest({ request });
      }}
      onClick={e => props.actions.onPreventClose(e)}
    />
  );
};

export default React.forwardRef(Input);
