import React from 'react';

import Input from './InputWithNavigation';
import Reset from './ResetWithNavigation';

export default function SearchInput(props) {
  const { reset, input, actions, inputRef, autoFocus, withNavigation } = props;
  const inputActions = {
    ...actions,
    onClick(e) {
      props.actions.onPreventClose(e);
    },
    onChange({ value }) {
      const request = value;
      props.actions.onRequest({ request });
    },
  };
  const resetActions = {
    ...actions,
    onClick(e) {
      props.actions.onPreventClose(e);
      props.actions.onReset();
      props.actions.onFocus();
    },
  };
  return (
    <>
      <Input { ...input } actions={inputActions} withNavigation={withNavigation} autoFocus={autoFocus} ref={inputRef} />
      <Reset { ...reset } actions={resetActions} withNavigation={withNavigation} />
    </>
  );
};
