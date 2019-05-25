import * as types from './reducer';
import { mapValues } from '../helpers';

const actionMap = {
  onRequest:  types.SEARCH_REQUEST,
  onResponse: types.SEARCH_RESPONSE,
  onReset:    types.SEARCH_RESET,
  onClose:    types.SEARCH_CLOSE,
  onSelect:   types.SEARCH_SELECT,
  onUp:       types.SEARCH_UP,
  onDown:     types.SEARCH_DOWN,
};

const actions = mapValues(actionMap, type => (payload = {}) => ({
  type,
  payload,
}));

export default actions;
