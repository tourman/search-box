import React from 'react';
import { connect } from 'react-redux';
import { mapValues } from '../helpers';

import actions from './actions';
import SearchWrapper from './Wrapper';
import { BusyIndicator } from '../BusyIndicator';
import { SearchInput } from '../Search.Input';
import { PopupList } from '../Search.PopupList';

function Search(props) {
  const { list } = props;
  return (
    <SearchWrapper>
      <SearchInput { ...props } />
      <BusyIndicator { ...props } />
      <PopupList { ...list } />
    </SearchWrapper>
  );
}

function mapStateToProps(state) {
  return state.search;
}

function mapDispatchToProps(dispatch) {
  return mapValues(actions, action => payload => dispatch(action(payload)));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
