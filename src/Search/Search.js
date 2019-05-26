import React, { useRef, useEffect } from 'react';

import SearchWrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';
import withNavigation from './withNavigation';

function Search(props, ref) {
  const inputRef = useRef();
  const { list, actions } = props;
  actions.onFocus = () => inputRef.current.focus();
  return (
    <SearchWrapper ref={ref}>
      <SearchInput { ...props } actions={actions} inputRef={inputRef} withNavigation={withNavigation} autoFocus={true} />
      <BusyIndicator { ...props } />
      <PopupList { ...list } actions={actions} withNavigation={withNavigation} />
    </SearchWrapper>
  );
}

export default React.forwardRef(Search);
