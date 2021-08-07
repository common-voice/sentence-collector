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
    errorMessage,
    skippedSentences: [1],
  }));
  render(<Settings />);
  expect(screen.getByText(errorMessage)).toBeTruthy();
});

test('should render button to reset skipped sentences', () => {
  render(<Settings />);
  expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
});

test('should not render button to reset skipped sentences if no skipped sentences', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    errorMessage: '',
    skippedSentences: [],
  }));
  render(<Settings />);
  expect(screen.queryByText('Show all skipped sentences again')).toBeNull();
});

test('should reset when reset button is clicked', async () => {
  render(<Settings />);

  await waitFor(() => {
    expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
  });
  await userEvent.click(screen.getByText('Show all skipped sentences again'));
  expect(dispatchMock).toHaveBeenCalledWith(resetSkippedSentences());
});
