import PropTypes from 'prop-types';
import { flowRight } from '../helpers';

import withRef from './withRef';
import withClosing from './withClosing';
import withNavigation from './withNavigation';
import withFocus from './withFocus';
import connector from './connector';
import container from './container';

import SearchBox from './SearchBox';

const ComposedSearchBox = flowRight([
  container,
  connector,
  withRef,
  withClosing,
  withNavigation,
  withFocus,
])(SearchBox);

ComposedSearchBox.propTypes = {
  api: PropTypes.shape({
    search: PropTypes.func.isRequired,
  }).isRequired,
  autoFocus: PropTypes.bool,
};

export default ComposedSearchBox;
