import React, { useRef, useEffect } from 'react';

import SearchWrapper from './Wrapper';
import CloseManager from './CloseManager';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';
import withNavigation from './withNavigation';

export default function Search(props) {
  const inputRef = useRef();
  const { list, actions } = props;
  actions.onFocus = () => inputRef.current.focus();
  return (
    <SearchWrapper>
      <CloseManager actions={actions}>
        <SearchInput { ...props } actions={actions} inputRef={inputRef} withNavigation={withNavigation} autoFocus={true} />
        <BusyIndicator { ...props } />
        <PopupList { ...list } actions={actions} withNavigation={withNavigation} />
      </CloseManager>
    </SearchWrapper>
  );
}
