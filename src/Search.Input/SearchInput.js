import React from 'react';
import Input from './Input';
import Reset from './Reset';

export default function SearchInput(props) {
  const { reset, input } = props;
  return (
    <>
      <Input { ...input } />
      <Reset { ...reset } />
    </>
  );
};
