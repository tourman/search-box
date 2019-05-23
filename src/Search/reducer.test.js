import reducer from './reducer';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });
});
