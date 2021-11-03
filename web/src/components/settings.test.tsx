import React from 'react';
import * as redux from 'react-redux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLocalization } from '../../tests/test-utils';

import { resetSkippedSentences } from '../actions/sentences';
import Settings from './settings';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    showErrorMessage: false,
    skippedSentences: [1],
  }));
});

test('should render title', async () => {
  await renderWithLocalization(<Settings />);
  expect(screen.getByText('Settings')).toBeTruthy();
});

test('should render error message', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    showErrorMessage: true,
    skippedSentences: [1],
  }));
  await renderWithLocalization(<Settings />);
  expect(screen.getByText(/Could not change settings. Please try again./)).toBeTruthy();
});

test('should render button to reset skipped sentences', async () => {
  await renderWithLocalization(<Settings />);
  expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
});

test('should not render button to reset skipped sentences if no skipped sentences', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    showErrorMessage: false,
    skippedSentences: [],
  }));
  await renderWithLocalization(<Settings />);
  expect(screen.queryByText('Show all skipped sentences again')).toBeNull();
});

test('should reset when reset button is clicked', async () => {
  await renderWithLocalization(<Settings />);

  await waitFor(() => {
    expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
  });
  await userEvent.click(screen.getByText('Show all skipped sentences again'));
  expect(dispatchMock).toHaveBeenCalledWith(resetSkippedSentences());
});
