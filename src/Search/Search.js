import React from 'react';
import { connect } from 'react-redux';
import { mapValues } from '../helpers';

import actions from './actions';
import SearchWrapper from './Wrapper';
import CloseManager from './CloseManager';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

function Search(props) {
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

function mapStateToProps(state) {
  return state.search;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: mapValues(actions, action => payload => dispatch(action(payload))),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
