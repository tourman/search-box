import React from 'react';

import Wrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { ErrorIndicator } from '../ErrorIndicator';
import { Input } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

function Search(props, ref) {
  const { list, actions, inputRef, placeholder } = props;
  return (
    <Wrapper ref={ref}>
      <BusyIndicator  { ...props } />
      <Input     { ...props } actions={actions} placeholder={placeholder} ref={inputRef} />
      <ErrorIndicator { ...props } />
      <PopupList { ...list }  actions={actions} />
    </Wrapper>
  );
};

export default React.forwardRef(Search);
