import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';

import * as backend from '../../backend';
import { renderWithLocalization } from '../../../tests/test-utils';

import Stats from './stats';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
  jest.spyOn(backend, 'sendRequest');

  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    pendingLanguages: false,
  }));

  (backend.sendRequest as jest.Mock).mockImplementation(() => ({
    all: {
      en: {
        added: 222,
        validated: 33,
        rejected: 44,
      },
    },
    totals: {
      total: 500,
      languages: 20,
    },
    userUnreviewed: {
      en: 2,
    },
    userAdded: {
      en: 4,
    },
  }));
});

test('should render stats', async () => {
  await renderWithLocalization(<Stats />);
  expect(screen.getByText('Statistics')).toBeTruthy();
  expect(screen.getByText(/collected \u2068500\u2069 sentences/)).toBeTruthy();
  expect(screen.getByText(/in \u206820\u2069 languages/)).toBeTruthy();
  expect(screen.getByText(/\u2068222\u2069 total sentences/)).toBeTruthy();
  expect(screen.getByText(/\u2068145\u2069 sentences in review/)).toBeTruthy();
  expect(screen.getByText(/\u20682\u2069 sentences left for you/)).toBeTruthy();
  expect(screen.getByText(/\u20684\u2069 added by you/)).toBeTruthy();
  expect(screen.getByText(/\u206833\u2069 validated sentences/)).toBeTruthy();
  expect(screen.getByText(/\u206844\u2069 rejected sentences/)).toBeTruthy();
});

test('should render error if no languages fetched', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [],
    pendingLanguages: false,
    fetchFailure: true,
  }));

  await renderWithLocalization(<Stats />);
  expect(screen.queryByText(/We failed to fetch available languages./)).toBeTruthy();
});

test('should render error', async () => {
  (backend.sendRequest as jest.Mock).mockImplementation(() => {
    throw new Error('oh no');
  });

  await renderWithLocalization(<Stats />);
  expect(screen.getByText('Statistics')).toBeTruthy();
  expect(screen.getByText(/could not fetch the stats/)).toBeTruthy();
});
