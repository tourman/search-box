import React from 'react';

export default function Input(props) {
  return (
    <input
      value={props.string}
      onChange={e => {
        const request = e.target.value;
        props.actions.onRequest({ request });
      }}
      onClick={e => props.actions.onPreventClose(e)}
    />
  );
};
