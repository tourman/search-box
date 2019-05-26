import React from 'react';
import { flowRight } from '../helpers';

import withRef from './withRef';
import withClosing from './withClosing';
import withNavigation from './withNavigation';
import withFocus from './withFocus';
import connector from './connector';
import container from './container';

import SearchWrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { Input } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

function Search(props, ref) {
  const { list, actions, inputRef } = props;
  return (
    <SearchWrapper ref={ref}>
      <Input     { ...props } actions={actions} ref={inputRef} autoFocus={true} />
      <BusyIndicator { ...props } />
      <PopupList { ...list }  actions={actions} />
    </SearchWrapper>
  );
}

export default flowRight([
  container,
  connector,
  withRef,
  withClosing,
  withNavigation,
  withFocus,
  React.forwardRef,
])(Search);
