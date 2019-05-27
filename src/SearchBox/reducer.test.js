import reducer from './reducer';
import { merge } from '../helpers';

const cloneAndMerge = (...extensions) => merge({}, initialState, ...extensions);

const initialState = {
  busy: false,
  error: '',
  reset: {
    available: false,
  },
  input: {
    string: '',
    error: false,
    focusCounter: 0,
  },
  list: {
    available: false,
    items: [],
  },
};

const responses = {
  'oo': {
    count: 4,
    next: null,
    previous: null,
    results: [
      {
        id: 'a',
        name: 'Naboo',
      },
      {
        id: 'b',
        name: 'Dantoo/^$ine',
      },
      {
        id: 'c',
        name: 'Tatooine',
      },
      {
        id: 'd',
        name: 'Moooooroo',
      },
    ],
  },
};

const stateItems = {
  'oo': [
    {
      id: 'a',
      name: 'Naboo',
      split: [
        {
          type: 'normal',
          text: 'Nab',
        },
        {
          type: 'selected',
          text: 'oo',
        },
      ],
    },
    {
      id: 'b',
      name: 'Dantoo/^$ine',
      split: [
        {
          type: 'normal',
          text: 'Dant',
        },
        {
          type: 'selected',
          text: 'oo',
        },
        {
          type: 'normal',
          text: '/^$ine',
        },
      ],
    },
    {
      id: 'c',
      name: 'Tatooine',
      split: [
        {
          type: 'normal',
          text: 'Tat',
        },
        {
          type: 'selected',
          text: 'oo',
        },
        {
          type: 'normal',
          text: 'ine',
        },
      ],
    },
    {
      id: 'd',
      name: 'Moooooroo',
      split: [
        {
          type: 'normal',
          text: 'M',
        },
        {
          type: 'selected',
          text: 'oo',
        },
        {
          type: 'selected',
          text: 'oo',
        },
        {
          type: 'normal',
          text: 'or',
        },
        {
          type: 'selected',
          text: 'oo',
        },
      ],
    },
  ],
  'Some test': [
    {
      id: 'Some test',
      name: 'Some test',
      split: [
        {
          type: 'normal',
          text: 'Some ',
        },
        {
          type: 'selected',
          text: 'test',
        },
      ],
    }
  ],
};

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('request', () => {
    const items = stateItems['oo'];
    const type = 'SEARCH_REQUEST';
    const testItems = [
      {
        it: 'should handle request by search string while idle',
        payload:  { type, payload: { request: 'oo', }, },
        state:    { busy: false, reset: { available: false, }, input: { string: '',   error: false, }, list: { available: false, items: [], }, error: '', },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'oo', error: false, }, list: { available: false, items: [], }, error: '', },
      },
      {
        it: 'should handle request by search string while idle',
        payload:  { type, payload: { request: 'o', }, },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo', error: false, }, list: { available: true,  items,     }, error: '', },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'o',  error: false, }, list: { available: true,  items,     }, error: '', },
      },
      {
        it: 'should handle request by search string while idle with an error',
        payload:  { type, payload: { request: 'o', }, },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo', error: true,  }, list: { available: true,  items,     }, error: 'E', },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'o',  error: false, }, list: { available: true,  items,     }, error: '',  },
      },
      {
        it: 'should handle an empty request by search string while idle',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: false, reset: { available: false, }, input: { string: '',   error: false, }, list: { available: false, items: [], }, error: '', },
        expected: { busy: false, reset: { available: false, }, input: { string: '',   error: false, }, list: { available: false, items: [], }, error: '', },
      },
      {
        it: 'should handle reset by an empty string while idle',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo', error: false, }, list: { available: true,  items,     }, error: '', },
        expected: { busy: false, reset: { available: false, }, input: { string: '',   error: false, }, list: { available: false, items,     }, error: '', },
      },
      {
        it: 'should handle reset by an empty string while idle with an error',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo', error: true,  }, list: { available: true,  items,     }, error: 'E', },
        expected: { busy: false, reset: { available: false, }, input: { string: '',   error: false, }, list: { available: false, items,     }, error: '',  },
      },
      {
        it: 'should handle request by search string while searching',
        payload:  { type, payload: { request: 'oo', }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'o',  error: false, }, list: { available: false, items: [], }, error: '', },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'oo', error: false, }, list: { available: false, items: [], }, error: '', },
      },
      {
        it: 'should handle reset by an empty string while searching',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'o' , error: false, }, list: { available: true,  items,     }, error: '', },
        expected: { busy: false, reset: { available: false, }, input: { string: '',   error: false, }, list: { available: false, items,     }, error: '', },
      },
    ];
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        // Act
        const result = reducer(item.state, item.payload);
        // Assert
        expect(result).toEqual(item.expected);
      });
    });
  });

  describe('response', () => {
    const responseWithItems = responses['oo'];
    const emptyResponse = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
    const type = 'SEARCH_RESPONSE';
    const items = stateItems['oo'];
    const testItems = [
      {
        it: 'should handle a productive search response from scratch',
        payload:  { type, payload: { response: responseWithItems, }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo',  }, list: { available: false, items: [], } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo',  }, list: { available: true,  items,     } },
      },
      {
        it: 'should handle an empty search response from scratch',
        payload:  { type, payload: { response: emptyResponse, }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo',  }, list: { available: false, items: [], } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo',  }, list: { available: false, items: [], } },
      },
      {
        it: 'should handle a productive search response from previous search',
        payload:  { type, payload: { response: responseWithItems, }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo',  }, list: { available: true,  items: items.slice(1), } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo',  }, list: { available: true,  items, } },
      },
      {
        it: 'should handle an empty search response from previous search',
        payload:  { type, payload: { response: emptyResponse, }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo',  }, list: { available: true,  items, } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo',  }, list: { available: false, items: [], } },
      },
    ];
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        // Act
        const result = reducer(item.state, item.payload);
        // Assert
        expect(result).toEqual(item.expected);
      });
    });
  });

  describe('response error', () => {
    const type = 'SEARCH_ERROR';
    const error = 'Error message';
    const items = stateItems['oo'];
    const payload = { type, payload: { error }, };
    const testItems = [
      {
        it: 'should handle an error message while searching from scratch',
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo', error: false, }, list: { available: false, items: [], }, error: '', },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo', error: true,  }, list: { available: false, items: [], }, error,     },
      },
      {
        it: 'should handle an error message while searching from previous search',
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo', error: false, }, list: { available: true,  items,     }, error: '', },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo', error: true,  }, list: { available: true,  items,     }, error,     },
      },
      {
        it: 'should handle an error message while searching from previous search with an error',
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo', error: true,  }, list: { available: true,  items,     }, error: 'E', },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo', error: true,  }, list: { available: true,  items,     }, error,      },
      },
    ];
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        // Act
        const result = reducer(item.state, payload);
        // Assert
        expect(result).toEqual(item.expected);
      });
    });
  });

  describe('reset', () => {
    const items = stateItems['Some test'];
    const testItems = [
      {
        it: 'should handle search reseting',
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'test', error: false, focusCounter: 0, }, list: { available: true,  items, }, error: '',  },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     error: false, focusCounter: 1, }, list: { available: false, items, }, error: '',  },
      },
      {
        it: 'should handle search string clearing',
        state:    { busy: false, reset: { available: true,  }, input: { string: 'test', error: false, focusCounter: 2, }, list: { available: true,  items, }, error: '',  },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     error: false, focusCounter: 3, }, list: { available: false, items, }, error: '',  },
      },
      {
        it: 'should handle search string clearing with an error',
        state:    { busy: false, reset: { available: true,  }, input: { string: 'test', error: true,  focusCounter: 4, }, list: { available: true,  items, }, error: 'E', },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     error: false, focusCounter: 5, }, list: { available: false, items, }, error: '',  },
      },
      {
        it: 'should ignore search string clearing',
        state:    { busy: false, reset: { available: false, }, input: { string: '',     error: false, focusCounter: 6, }, list: { available: false, items, }, error: '',  },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     error: false, focusCounter: 7, }, list: { available: false, items, }, error: '',  },
      },
    ];
    const payload = {
      type: 'SEARCH_RESET',
      payload: {},
    };
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        // Act
        const result = reducer(item.state, payload);
        // Assert
        expect(result).toEqual(item.expected);
      });
    });
  });

  describe('close', () => {
    const items = stateItems['Some test'];
    const testItems = [
      {
        it: 'should close search list while searching',
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'oo',   }, list: { available: true,  items, } },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'oo',   }, list: { available: false, items, } },
      },
      {
        it: 'should close search list while idle',
        state:    { busy: false, reset: { available: true,  }, input: { string: 'test', }, list: { available: true,  items, } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'test', }, list: { available: false, items, } },
      },
    ];
    const payload = {
      type: 'SEARCH_CLOSE',
      payload: {},
    };
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        // Act
        const result = reducer(item.state, payload);
        // Assert
        expect(result).toEqual(item.expected);
      });
    });
  });

  describe('select', () => {
    const items = stateItems['oo'];
    const testItems = [
      {
        it: 'should select an item while idle',
        payload:  { id: 'a', },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo',       focusCounter: 0, }, list: { available: true,  items,                    } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'Naboo',    focusCounter: 1, }, list: { available: false, items: items.slice(0, 1), } },
      },
      {
        it: 'should select an item while searching',
        payload:  { id: 'c', },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'too',      focusCounter: 2, }, list: { available: true,  items,                    } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'Tatooine', focusCounter: 3, }, list: { available: false, items: items.slice(2, 3), } },
      },
      {
        it: 'should select an absent item while idle',
        payload:  { id: 'absent', },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo',       focusCounter: 4, }, list: { available: true,  items,                    } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo',       focusCounter: 4, }, list: { available: true,  items,                    } },
      },
      {
        it: 'should select an absent item while searching',
        payload:  { id: 'absent', },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'too',      focusCounter: 6, }, list: { available: true,  items,                    } },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'too',      focusCounter: 6, }, list: { available: true,  items,                    } },
      },
    ];
    const type = 'SEARCH_SELECT';
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        const { payload } = item;
        // Act
        const result = reducer(item.state, { type, payload });
        // Assert
        expect(result).toEqual(item.expected);
      });
    });
  });

  describe('navigation', () => {
    const testItems = [
      {
        it: 'should move down when no selection',
        payload: { type: 'SEARCH_DOWN', },
        selectedIndex: -1,
        expectedIndex: 0,
      },
      {
        it: 'should move down when not last item selected',
        payload: { type: 'SEARCH_DOWN', },
        selectedIndex: 1,
        expectedIndex: 2,
      },
      {
        it: 'should not move down when the last item selected',
        payload: { type: 'SEARCH_DOWN', },
        selectedIndex: 3,
        expectedIndex: 3,
      },
      {
        it: 'should move up when not first item selected',
        payload: { type: 'SEARCH_UP', },
        selectedIndex: 3,
        expectedIndex: 2,
      },
      {
        it: 'should not move up when the first item selected',
        payload: { type: 'SEARCH_UP', },
        selectedIndex: 0,
        expectedIndex: 0,
      },
      {
        it: 'should not move up when no selection',
        payload: { type: 'SEARCH_UP', },
        selectedIndex: -1,
        expectedIndex: -1,
      },
    ];
    testItems.forEach(item => {
      it(item.it, () => {
        // Arrange
        const state = cloneAndMerge({
          list: {
            items: stateItems['oo'].map((stateItem, index) => ({
              ...stateItem,
              selected: index === item.selectedIndex,
            })),
          },
        });
        // Act
        const result = reducer(state, item.payload);
        const selectedIndex = result.list.items.findIndex(resultItem => resultItem.selected);
        // Assert
        expect(selectedIndex).toEqual(item.expectedIndex);
      });
    });
  });
});
