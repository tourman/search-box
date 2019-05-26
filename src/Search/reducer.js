import produce from 'immer';
import { zip } from '../helpers';

const SEARCH_REQUEST = 'SEARCH_REQUEST';
const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
const SEARCH_ERROR = 'SEARCH_ERROR';
const SEARCH_RESET = 'SEARCH_RESET';
const SEARCH_CLOSE = 'SEARCH_CLOSE';
const SEARCH_SELECT = 'SEARCH_SELECT';
const SEARCH_DOWN = 'SEARCH_DOWN';
const SEARCH_UP = 'SEARCH_UP';

const initialState = {
  busy: false,
  error: '',
  reset: {
    available: false,
  },
  input: {
    string: '',
    error: false,
  },
  list: {
    available: false,
    items: [],
  },
};

function splitName(name, request) {
  const re = new RegExp(request, 'gi');
  const tokenSets = {};
  tokenSets.normal = name.split(re);
  if (tokenSets.normal === 1) {
    throw new Error(`No matches for name (${name}) and request (${request})`);
  }
  tokenSets.selected = name.match(re);
  const tokensByType = Object.entries(tokenSets)
    .map(([ type, tokens ]) => tokens.map(text => ({
      type,
      text,
    })))
  ;
  const split = zip(...tokensByType)
    .flat()
    .filter(splitToken => splitToken && splitToken.text)
  ;
  return split;
}

function reset(draft) {
  draft.busy = false;
  draft.reset.available = false;
  draft.input.string = '';
  draft.list.available = false;
}

export default function search(prevState = initialState, { type, payload }) {
  const state = produce(prevState, draft => {
    switch(type) {
      case SEARCH_REQUEST: {
        if (payload.request) {
          draft.busy = true;
          draft.reset.available = true;
          draft.input.string = payload.request;
        } else {
          reset(draft);
        }
        draft.error = '';
        draft.input.error = false;
        break;
      }
      case SEARCH_RESPONSE: {
        draft.busy = false;
        const results = payload.response.results || [];
        draft.list.available = !!results.length;
        draft.list.items = results.map(({ name, ...item }) => ({
          ...item,
          name,
          split: splitName(name, draft.input.string),
        }));
        break;
      }
      case SEARCH_ERROR: {
        draft.error = payload.error;
        draft.input.error = true;
        draft.busy = false;
        break;
      }
      case SEARCH_RESET: {
        reset(draft);
        draft.error = '';
        draft.input.error = false;
        break;
      }
      case SEARCH_CLOSE: {
        draft.list.available = false;
        break;
      }
      case SEARCH_SELECT: {
        const item = draft.list.items.find(item => item.name === payload.name);
        if (!item) break;
        draft.busy = false;
        draft.list.available = false;
        draft.list.items = [item];
        draft.input.string = payload.name;
        break;
      }
      case SEARCH_DOWN: {
        const { items } = draft.list;
        const selectedIndex = items.findIndex(item => item.selected);
        const last = selectedIndex === items.length - 1;
        if (last) break;
        items[selectedIndex + 1].selected = true;
        if (!~selectedIndex) break;
        items[selectedIndex    ].selected = false;
        break;
      }
      case SEARCH_UP: {
        const { items } = draft.list;
        const selectedIndex = items.findIndex(item => item.selected);
        if (!~selectedIndex) break;
        if (!selectedIndex) break;
        items[selectedIndex - 1].selected = true;
        items[selectedIndex    ].selected = false;
        break;
      }
      default: {
        break;
      }
    }
  });
  return state;
};

export {
  SEARCH_REQUEST,
  SEARCH_RESPONSE,
  SEARCH_ERROR,
  SEARCH_RESET,
  SEARCH_CLOSE,
  SEARCH_SELECT,
  SEARCH_DOWN,
  SEARCH_UP,
};
