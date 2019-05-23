import reducer from './reducer';
import { merge } from '../helpers';

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

const cloneAndMerge = merge.bind(null, {}, initialState);

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle search string', () => {
    expect(reducer(initialState, {
      type: 'SEARCH_REQUEST',
      payload: {
        request: 'aboo',
      },
    })).toEqual(cloneAndMerge({
      busy: true,
      reset: {
        available: true,
      },
      input: {
        string: 'aboo',
      },
    }));
  });
});
