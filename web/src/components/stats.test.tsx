import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

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
        name: 'English',
        nativeName: 'English',
      },
    ],
    languages: ['en'],
    lastStatsUpdate: 10000,
    statsUpdating: false,
    totals: {
      total: 500,
      languages: 20,
    },
  }));

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
});

test('should dispatch getStats', () => {
  render(
    <BrowserRouter>
      <Stats />
    </BrowserRouter>
  );
  expect(dispatchMock).toHaveBeenCalled();
});

test('should render stats', () => {
  render(
    <BrowserRouter>
      <Stats />
    </BrowserRouter>
  );
  expect(screen.getByText('Statistics')).toBeTruthy();
  expect(screen.getByText(/Last Update:/)).toBeTruthy();
  expect(screen.getByText(/collected 500 sentences/)).toBeTruthy();
  expect(screen.getByText(/in 20 languages/)).toBeTruthy();
  expect(screen.getByText(/222 total sentences/)).toBeTruthy();
  expect(screen.getByText(/145 sentences in review/)).toBeTruthy();
  expect(screen.getByText(/2 sentences left for you/)).toBeTruthy();
  expect(screen.getByText(/33 validated sentences/)).toBeTruthy();
  expect(screen.getByText(/44 rejected sentences/)).toBeTruthy();
});

test('should render updating', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    all: {},
    userUnreviewed: {},
    allLanguages: [],
    languages: [],
    lastStatsUpdate: undefined,
    statsUpdating: true,
  }));

  render(
    <BrowserRouter>
      <Stats />
    </BrowserRouter>
  );
  expect(screen.getByText('Updating...')).toBeTruthy();
});
