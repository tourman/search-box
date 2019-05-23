import produce from 'immer';

const SEARCH_REQUEST = 'SEARCH_REQUEST';

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

export default function search(prevState = initialState, action) {
  const state = produce(prevState, draft => {
    switch(action.type) {
      case SEARCH_REQUEST: {
        draft.busy = true;
        draft.reset.available = true;
        draft.input.string = action.payload.request;
        break;
      }
      default: {
        break;
      }
    }
  });
  return state;
};
