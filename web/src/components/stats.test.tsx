import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import Stats from './stats';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    all: {
      en: {
        added: 222,
        validated: 33,
        rejected: 44,
      },
    },
    userUnreviewed: {
      en: 2,
    },
    allLanguages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    lastStatsUpdate: 10000,
    statsUpdating: false,
    totals: {
      total: 500,
      languages: 20,
    },
  }));

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
});

test('should dispatch getStats', async () => {
  await renderWithLocalization(<Stats />);
  expect(dispatchMock).toHaveBeenCalled();
});

test('should render stats', async () => {
  await renderWithLocalization(<Stats />);
  expect(screen.getByText('Statistics')).toBeTruthy();
  expect(screen.getByText(/Last Update:/)).toBeTruthy();
  expect(screen.getByText(/collected \u2068500\u2069 sentences/)).toBeTruthy();
  expect(screen.getByText(/in \u206820\u2069 languages/)).toBeTruthy();
  expect(screen.getByText(/\u2068222\u2069 total sentences/)).toBeTruthy();
  expect(screen.getByText(/\u2068145\u2069 sentences in review/)).toBeTruthy();
  expect(screen.getByText(/\u20682\u2069 sentences left for you/)).toBeTruthy();
  expect(screen.getByText(/\u206833\u2069 validated sentences/)).toBeTruthy();
  expect(screen.getByText(/\u206844\u2069 rejected sentences/)).toBeTruthy();
});

test('should render updating', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    all: {},
    userUnreviewed: {},
    allLanguages: [],
    languages: [],
    lastStatsUpdate: undefined,
    statsUpdating: true,
  }));

  await renderWithLocalization(<Stats />);
  expect(screen.getByText('Updating…')).toBeTruthy();
});
