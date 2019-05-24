import React from 'react';

import SearchWrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

export default function Search() {
  return (
    <SearchWrapper>
      <SearchInput />
      <BusyIndicator />
      <PopupList />
    </SearchWrapper>  
  );
};
