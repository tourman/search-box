import React from 'react';

import Input from './Input';
import Reset from './Reset';

function SearchInput(props, ref) {
  const { reset, input, actions, autoFocus, withNavigation, placeholder } = props;
  const inputActions = {
    ...actions,
    onChange({ value }) {
      const request = value;
      props.actions.onRequest({ request });
    },
  };
  const resetActions = {
    ...actions,
    onClick() {
      props.actions.onReset();
    },
  };
  return (
    <>
      <Input { ...input } actions={inputActions} withNavigation={withNavigation} placeholder={placeholder} autoFocus={autoFocus} ref={ref} />
      <Reset { ...reset } actions={resetActions} withNavigation={withNavigation} />
    </>
  );
};

export default React.forwardRef(SearchInput);
