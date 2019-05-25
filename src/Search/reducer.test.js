import reducer from './reducer';
import { merge } from '../helpers';

const cloneAndMerge = (...extensions) => merge({}, initialState, ...extensions);

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

const responses = {
  'oo': {
    count: 4,
    next: null,
    previous: null,
    results: [
      {
        name: 'Naboo',
      },
      {
        name: 'Dantoo/^$ine',
      },
      {
        name: 'Tatooine',
      },
      {
        name: 'Moooooroo',
      },
    ],
  },
};

const stateItems = {
  'oo': [
    {
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
        state:    { busy: false, reset: { available: false, }, input: { string: '',    }, list: { available: false, items: [], } },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'oo',  }, list: { available: false, items: [], } },
      },
      {
        it: 'should handle request by search string while idle',
        payload:  { type, payload: { request: 'o', }, },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo',  }, list: { available: true,  items,     } },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'o',   }, list: { available: true,  items,     } },
      },
      {
        it: 'should handle an empty request by search string while idle',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: false, reset: { available: false, }, input: { string: '',    }, list: { available: false, items: [], } },
        expected: { busy: false, reset: { available: false, }, input: { string: '',    }, list: { available: false, items: [], } },
      },
      {
        it: 'should handle reset by an empty string while idle',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo',  }, list: { available: true,  items,     } },
        expected: { busy: false, reset: { available: false, }, input: { string: '',    }, list: { available: false, items,     } },
      },
      {
        it: 'should handle request by search string while searching',
        payload:  { type, payload: { request: 'oo', }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'o',   }, list: { available: false, items: [], } },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'oo',  }, list: { available: false, items: [], } },
      },
      {
        it: 'should handle reset by an empty string while searching',
        payload:  { type, payload: { request: '', }, },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'o' ,  }, list: { available: true,  items,     } },
        expected: { busy: false, reset: { available: false, }, input: { string: '',    }, list: { available: false, items,     } },
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

  describe('reset', () => {
    const items = stateItems['Some test'];
    const testItems = [
      {
        it: 'should handle search reseting',
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'test', }, list: { available: true,  items, } },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     }, list: { available: false, items, } },
      },
      {
        it: 'should handle search string clearing',
        state:    { busy: false, reset: { available: true,  }, input: { string: 'test', }, list: { available: true,  items, } },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     }, list: { available: false, items, } },
      },
      {
        it: 'should ignore search string clearing',
        state:    { busy: false, reset: { available: false, }, input: { string: '',     }, list: { available: false, items, } },
        expected: { busy: false, reset: { available: false, }, input: { string: '',     }, list: { available: false, items, } },
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
        payload:  { name: 'Naboo', },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo',    }, list: { available: true,  items,                    } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'Naboo', }, list: { available: false, items: items.slice(0, 1), } },
      },
      {
        it: 'should select an item while searching',
        payload:  { name: 'Naboo', },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'too',   }, list: { available: true,  items,                    } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'Naboo', }, list: { available: false, items: items.slice(0, 1), } },
      },
      {
        it: 'should select an absent item while idle',
        payload:  { name: 'Absent planet', },
        state:    { busy: false, reset: { available: true,  }, input: { string: 'oo',    }, list: { available: true,  items,                    } },
        expected: { busy: false, reset: { available: true,  }, input: { string: 'oo',    }, list: { available: true,  items,                    } },
      },
      {
        it: 'should select an absent item while searching',
        payload:  { name: 'Absent planet', },
        state:    { busy: true,  reset: { available: true,  }, input: { string: 'too',   }, list: { available: true,  items,                    } },
        expected: { busy: true,  reset: { available: true,  }, input: { string: 'too',   }, list: { available: true,  items,                    } },
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
});
