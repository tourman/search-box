import React from 'react';
import Input from './Input';
import Reset from './Reset';

export default function SearchInput(props) {
  const { reset, input, actions, inputRef } = props;
  return (
    <>
      <Input { ...input } actions={actions} ref={inputRef} />
      <Reset { ...reset } actions={actions} />
    </>
  );
};
