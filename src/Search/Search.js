import React from 'react';

import SearchWrapper from './Wrapper';
import CloseManager from './CloseManager';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

export default function Search(props) {
  const { list, actions } = props;
  return (
    <SearchWrapper>
      <CloseManager actions={actions}>
        <SearchInput { ...props } actions={actions} />
        <BusyIndicator { ...props } />
        <PopupList { ...list } actions={actions} />
      </CloseManager>
    </SearchWrapper>
  );
}
