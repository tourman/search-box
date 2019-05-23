import produce from 'immer';

const SEARCH_REQUEST = 'SEARCH_REQUEST';
const SEARCH_RESPONSE = 'SEARCH_RESPONSE';

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
        draft.busy = true;
        draft.reset.available = true;
        draft.input.string = action.payload.request;
        break;
      }
      case SEARCH_RESPONSE: {
        draft.busy = false;
        draft.list.available = true;
        draft.list.items = action.payload.response.results.map(({ name }) => ({
          name,
          split: splitName(name, draft.input.string),
        }));
        break;
      }
      default: {
        break;
      }
    }
  });
  return state;
};
