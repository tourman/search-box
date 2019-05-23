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

export default function search(state = initialState, action) {
  switch(action.type) {
    default: {
      return state;
    }
  }
};
