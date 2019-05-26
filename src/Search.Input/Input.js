import React from 'react';

const styleMap = new Map()
  .set(false, {})
  .set(true,  {
    background: 'red',
    color: 'black',
  })
;

function Input(props, ref) {
  const { autoFocus, error } = props;
  const style = styleMap.get(error);
  return (
    <input
      ref={ref}
      style={style}
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
