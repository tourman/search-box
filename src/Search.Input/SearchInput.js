import React from 'react';
import Input from './Input';
import Reset from './Reset';

export default function SearchInput(props) {
  const { reset, input, actions } = props;
  return (
    <>
      <Input { ...input } actions={actions} />
      <Reset { ...reset } actions={actions} />
    </>
  );
};
