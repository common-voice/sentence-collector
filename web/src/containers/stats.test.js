import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import SentenceCollectorInfo from '../components/sentence-collector-info';
import LanguageStats from '../components/language-stats';
import Stats from './stats';

jest.mock('../components/sentence-collector-info');
jest.mock('../components/language-stats');

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  SentenceCollectorInfo.mockReturnValue(<div>...SentenceCollectorInfo...</div>);
  LanguageStats.mockReturnValue(<div>...LanguageStats...</div>);

  redux.useSelector.mockImplementation(() => ({
    all: {},
    userUnreviewed: {},
    allLanguages: [],
    languages: [],
    lastStatsUpdate: 10000,
    statsUpdating: false,
  }));

  redux.useDispatch.mockImplementation(() => dispatchMock);
});

test('should dispatch getStats', () => {
  render(<Stats/>);
  expect(dispatchMock).toHaveBeenCalled();
});

test('should render stats', () => {
  render(<Stats/>);
  expect(screen.getByText('Statistics')).toBeTruthy();
  expect(screen.getByText(/Last Update:/)).toBeTruthy();
  expect(screen.getByText('...SentenceCollectorInfo...')).toBeTruthy();
  expect(screen.getByText('...LanguageStats...')).toBeTruthy();
});

test('should render updating', () => {
  redux.useSelector.mockImplementation(() => ({
    all: {},
    userUnreviewed: {},
    allLanguages: [],
    languages: [],
    lastStatsUpdate: undefined,
    statsUpdating: true,
  }));

  render(<Stats/>);
  expect(screen.getByText('Updating...')).toBeTruthy();
});
