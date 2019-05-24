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
    }
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
    const responseWithItems = {
      count: 3,
      next: null,
      previous: null,
      results: [
        {
          name: 'Naboo',
          rotation_period: '26',
          orbital_period: '312',
          diameter: '12120',
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'grassy hills, swamps, forests, mountains',
          surface_water: '12',
          population: '4500000000',
          residents: [
            'https://swapi.co/api/people/3/',
            'https://swapi.co/api/people/21/',
            'https://swapi.co/api/people/36/',
            'https://swapi.co/api/people/37/',
            'https://swapi.co/api/people/38/',
            'https://swapi.co/api/people/39/',
            'https://swapi.co/api/people/42/',
            'https://swapi.co/api/people/60/',
            'https://swapi.co/api/people/61/',
            'https://swapi.co/api/people/66/',
            'https://swapi.co/api/people/35/'
          ],
          films: [
            'https://swapi.co/api/films/5/',
            'https://swapi.co/api/films/4/',
            'https://swapi.co/api/films/6/',
            'https://swapi.co/api/films/3/'
          ],
          created: '2014-12-10T11:52:31.066000Z',
          edited: '2014-12-20T20:58:18.430000Z',
          url: 'https://swapi.co/api/planets/8/'
        },
        {
          name: 'Dantoo/^$ine',
          rotation_period: '25',
          orbital_period: '378',
          diameter: '9830',
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'oceans, savannas, mountains, grasslands',
          surface_water: 'unknown',
          population: '1000',
          residents: [],
          films: [],
          created: '2014-12-10T17:23:29.896000Z',
          edited: '2014-12-20T20:58:18.461000Z',
          url: 'https://swapi.co/api/planets/25/'
        },
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          climate: 'arid',
          gravity: '1 standard',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
          residents: [
            'https://swapi.co/api/people/1/',
            'https://swapi.co/api/people/2/',
            'https://swapi.co/api/people/4/',
            'https://swapi.co/api/people/6/',
            'https://swapi.co/api/people/7/',
            'https://swapi.co/api/people/8/',
            'https://swapi.co/api/people/9/',
            'https://swapi.co/api/people/11/',
            'https://swapi.co/api/people/43/',
            'https://swapi.co/api/people/62/'
          ],
          films: [
            'https://swapi.co/api/films/5/',
            'https://swapi.co/api/films/4/',
            'https://swapi.co/api/films/6/',
            'https://swapi.co/api/films/3/',
            'https://swapi.co/api/films/1/'
          ],
          created: '2014-12-09T13:50:49.641000Z',
          edited: '2014-12-21T20:48:04.175778Z',
          url: 'https://swapi.co/api/planets/1/'
        }
      ]
    };
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
