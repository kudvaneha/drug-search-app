import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Mock GET /drugs
mock.onGet('/drugs').reply(config => {
  const name = config.params.name;

  if (name === 'aspirin') {
    return [200, { name: 'Aspirin', rxcui: '12345' }];
  }

  return [200, { name: 'No Results Found' }];
});

// Mock GET /spellingsuggestions
mock.onGet('/spellingsuggestions').reply(config => {
  const name = config.params.name;

  if (name === 'zyrte') {
    return [200, { suggestions: ['zyrtec'] }];
  }

  return [200, { suggestions: [] }];
});

// Mock GET /drugDetails
mock.onGet('/drugDetails').reply(config => {
  const name = config.params.name;

  if (name === 'Aspirin') {
    return [200, { name: 'Aspirin', rxcui: '12345', synonyms: ['Acetylsalicylic Acid'] }];
  }

  return [200, { name: 'No Details Found' }];
});
