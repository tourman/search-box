import React from 'react';

import Wrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { ErrorIndicator } from '../ErrorIndicator';
import { SearchInput } from '../SearchInput';
import { PopupList } from '../PopupList';

function Search(props, ref) {
  const { list, actions, inputRef, placeholder } = props;
  return (
    <Wrapper ref={ref}>
      <BusyIndicator  { ...props } />
      <SearchInput    { ...props } actions={actions} placeholder={placeholder} ref={inputRef} />
      <ErrorIndicator { ...props } />
      <PopupList      { ...list }  actions={actions} />
    </Wrapper>
  );
};

export default React.forwardRef(Search);
