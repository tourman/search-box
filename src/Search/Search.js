import React, { useRef } from 'react';

import SearchWrapper from './Wrapper';
import CloseManager from './CloseManager';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

export default function Search(props) {
  const inputRef = useRef();
  const { list, actions } = props;
  actions.onFocus = () => inputRef.current.focus();
  return (
    <SearchWrapper>
      <CloseManager actions={actions}>
        <SearchInput { ...props } actions={actions} inputRef={inputRef} autoFocus={true} />
        <BusyIndicator { ...props } />
        <PopupList { ...list } actions={actions} />
      </CloseManager>
    </SearchWrapper>
  );
}
