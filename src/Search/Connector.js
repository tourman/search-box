import { connect } from 'react-redux';
import { mapValues } from '../helpers';
import actions from './actions';
import Search from './Search';

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
