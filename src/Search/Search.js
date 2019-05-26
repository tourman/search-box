import React from 'react';

import Wrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { Input } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

function Search(props, ref) {
  const { list, actions, inputRef } = props;
  return (
    <Wrapper ref={ref}>
      <Input     { ...props } actions={actions} ref={inputRef} />
      <BusyIndicator { ...props } />
      <PopupList { ...list }  actions={actions} />
    </Wrapper>
  );
};

export default React.forwardRef(Search);
