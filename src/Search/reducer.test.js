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

const cloneAndMerge = (...extensions) => merge({}, initialState, ...extensions);

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle request by search string', () => {
    // Arrange
    const state = initialState;
    const payload = {
      type: 'SEARCH_REQUEST',
      payload: {
        request: 'oo',
      },
    };
    const expected = cloneAndMerge({
      busy: true,
      reset: {
        available: true,
      },
      input: {
        string: 'oo',
      },
    });
    // Act
    const result = reducer(state, payload);
    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle a productive search response', () => {
    // Arrange
    const state = cloneAndMerge({
      busy: true,
      reset: {
        available: true,
      },
      input: {
        string: 'oo',
      },
    });
    const payload = {
      type: 'SEARCH_RESPONSE',
      payload: {
        response: {
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
        },
      },
    };
    const expected = cloneAndMerge(state, {
      busy: false,
      reset: {
        available: true,
      },
      list: {
        available: true,
        items: [
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
      },
    });
    // Act
    const result = reducer(state, payload);
    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle an empty search response', () => {
    // Arrange
    const state = cloneAndMerge({
      busy: true,
      reset: {
        available: true,
      },
      input: {
        string: 'ootest',
      },
    });
    const payload = {
      type: 'SEARCH_RESPONSE',
      payload: {
        response: {
          count: 0,
          next: null,
          previous: null,
          results: []
        },
      },
    };
    const expected = cloneAndMerge(state, {
      busy: false,
      reset: {
        available: true,
      },
      list: {
        available: false,
        items: [],
      },
    });
    // Act
    const result = reducer(state, payload);
    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle search reseting', () => {
    // Arrange
    const state = cloneAndMerge({
      busy: true,
      reset: {
        available: true,
      },
      input: {
        string: 'ootest',
      },
    });
    const payload = {
      type: 'SEARCH_RESET',
      payload: {},
    };
    const expected = cloneAndMerge(state, {
      busy: false,
      reset: {
        available: false,
      },
      list: {
        available: false,
        items: [],
      },
      input: {
        string: '',
      },
    });
    // Act
    const result = reducer(state, payload);
    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle search string clearing', () => {
    // Arrange
    const state = cloneAndMerge({
      reset: {
        available: true,
      },
      input: {
        string: 'ootest',
      },
    });
    const payload = {
      type: 'SEARCH_RESET',
      payload: {},
    };
    const expected = cloneAndMerge(state, {
      reset: {
        available: false,
      },
      input: {
        string: '',
      },
    });
    // Act
    const result = reducer(state, payload);
    // Assert
    expect(result).toEqual(expected);
  });
});
