import produce from 'immer';

const SEARCH_REQUEST = 'SEARCH_REQUEST';
const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
const SEARCH_RESET = 'SEARCH_RESET';

const initialState = {
  busy: false,
  reset: {
    available: false,
  },
  input: {
    string: '',
  },
  list: {
    available: false,
    items: [],
  },
};

function splitName(name, request) {
  const typeMap = [
    'normal',
    'selected',
    'normal',
  ];
  const re = new RegExp(`^(.*)(${request})(.*)$`);
  const match = name.match(re);
  if (!match) {
    throw new Error(`No matches for name (${name}) and request (${request})`);
  }
  const tokens = [].slice.call(match, 1);
  const split = tokens
    .map((text, index) => ({
      type: typeMap[index],
      text,
    }))
    .filter(item => !!item.text)
  ;
  return split;
}

export default function search(prevState = initialState, action) {
  const state = produce(prevState, draft => {
    switch(action.type) {
      case SEARCH_REQUEST: {
        if (action.payload.request) {
          draft.busy = true;
          draft.reset.available = true;
          draft.input.string = action.payload.request;
        } else {
          draft.reset.available = false;
          draft.input.string = '';
          draft.list.available = false;
          draft.list.items.length && (draft.list.items = []);
        }
        break;
      }
      case SEARCH_RESPONSE: {
        draft.busy = false;
        const results = action.payload.response.results || [];
        draft.list.available = !!results.length;
        draft.list.items = results.map(({ name }) => ({
          name,
          split: splitName(name, draft.input.string),
        }));
        break;
      }
      case SEARCH_RESET: {
        draft.busy = false;
        draft.reset.available = false;
        draft.list.available = false;
        draft.list.items.length && (draft.list.items = []);
        draft.input.string = '';
        break;
      }
      default: {
        break;
      }
    }
  });
  return state;
};
