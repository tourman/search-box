import React from 'react';

import Input from './Input';
import Reset from './Reset';

export default function SearchInput(props) {
  const { reset, input, actions, inputRef, autoFocus, withNavigation } = props;
  const inputActions = {
    ...actions,
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
