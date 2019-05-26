import { connect } from 'react-redux';
import { mapValues } from '../helpers';
import actions from './actions';

function mapStateToProps(state) {
  return state.search;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: mapValues(actions, action => payload => dispatch(action(payload))),
  };
}

export default function connector(Search) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Search);
};
