import React from 'react';
import * as redux from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { resetSkippedSentences } from '../actions/sentences';
import Settings from './settings';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');
  
  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    useSwipeReview: true,
    errorMessage: '',
    skippedSentences: [1],
  }));
});

test('should render title', () => {
  render(<Settings />);
  expect(screen.getByText('Settings')).toBeTruthy();
});

test('should render error message', () => {
  const errorMessage = 'This is an error';
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    useSwipeReview: true,
    errorMessage,
  }));
  render(<Settings />);
  expect(screen.getByText(errorMessage)).toBeTruthy();
});

test('should render experimental note', () => {
  render(<Settings />);
  expect(screen.getByText(/Experimental: There are two different tools with which you can review sentences/)).toBeTruthy();
});

test('should render button to use swipe review tool', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    useSwipeReview: false,
    errorMessage: '',
  }));
  render(<Settings />);
  expect(screen.getByText('Use Swiping Review Tool')).toBeTruthy();
});

test('should render button to use normal review tool', () => {
  render(<Settings />);
  expect(screen.getByText('Use Normal Review Tool')).toBeTruthy();
});

test('should save setting when review tool button is clicked', async () => {
  render(<Settings />);
  await waitFor(() => {
    expect(screen.getByText('Use Normal Review Tool')).toBeTruthy();
  });
  await userEvent.click(screen.getByText('Use Normal Review Tool'));
  expect(dispatchMock).toHaveBeenCalled();
});

test('should render button to reset skipped sentences', () => {
  render(<Settings />);
  expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
});

test('should not render button to reset skipped sentences if no skipped sentences', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    useSwipeReview: true,
    errorMessage: '',
    skippedSentences: [],
  }));
  render(<Settings />);
  expect(screen.queryByText('Show all skipped sentences again')).toBeNull();
});

test('should reset when reset button is clicked', async () => {
  render(
    <Settings />
  );
  
  await waitFor(() => {
    expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
  });
  await userEvent.click(screen.getByText('Show all skipped sentences again'));
  expect(dispatchMock).toHaveBeenCalledWith(resetSkippedSentences());
});

