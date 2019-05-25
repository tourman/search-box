import * as types from './reducer';
import { mapValues } from '../helpers';

const actionMap = {
  onRequest:  types.SEARCH_REQUEST,
  onResponse: types.SEARCH_RESPONSE,
  onReset:    types.SEARCH_RESET,
  onClose:    types.SEARCH_CLOSE,
  onSelect:   types.SEARCH_SELECT,
};

const actions = mapValues(actionMap, type => (payload = {}) => ({
  type,
  payload,
}));

export default actions;
