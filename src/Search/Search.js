import React, { useRef, useEffect } from 'react';
import { flowRight } from '../helpers';

import withRef from './withRef';
import withClosing from './withClosing';
import withNavigation from './withNavigation';
import connector from './connector';
import container from './container';

import SearchWrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

function Search(props, ref) {
  const inputRef = useRef();
  const { list, actions } = props;
  actions.onFocus = () => inputRef.current.focus();
  return (
    <SearchWrapper ref={ref}>
      <SearchInput { ...props } actions={actions} inputRef={inputRef} autoFocus={true} />
      <BusyIndicator { ...props } />
      <PopupList { ...list } actions={actions} />
    </SearchWrapper>
  );
}

export default flowRight([
  container,
  connector,
  withRef,
  withClosing,
  withNavigation,
  React.forwardRef,
])(Search);
