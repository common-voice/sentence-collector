import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Settings from './settings';

const swipeToggleMock = jest.fn();
const resetSkippedMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  swipeToggleMock.mockReset();
  resetSkippedMock.mockReset();
});

test('should render title', () => {
  render(<Settings onToggleSwipeReview={swipeToggleMock}/>);
  expect(screen.getByText('Settings')).toBeTruthy();
});

test('should render error message', () => {
  const errorMessage = 'This is an error';
  render(<Settings useSwipeReview={false} errorMessage={errorMessage} onToggleSwipeReview={swipeToggleMock}/>);
  expect(screen.getByText(errorMessage)).toBeTruthy();
});

test('should render experimental note', () => {
  render(<Settings onToggleSwipeReview={swipeToggleMock}/>);
  expect(screen.getByText(/Experimental: There are two different tools with which you can review sentences/)).toBeTruthy();
});

test('should render button to use swipe review tool', () => {
  render(<Settings useSwipeReview={false} onToggleSwipeReview={swipeToggleMock}/>);
  expect(screen.getByText('Use Swiping Review Tool')).toBeTruthy();
});

test('should render button to use normal review tool', () => {
  render(<Settings useSwipeReview={true} onToggleSwipeReview={swipeToggleMock}/>);
  expect(screen.getByText('Use Normal Review Tool')).toBeTruthy();
});

test('should call onToggleSwipeReview when review tool button is clicked', async () => {
  render(<Settings onToggleSwipeReview={swipeToggleMock}/>);
  await userEvent.click(screen.getByText('Use Swiping Review Tool'));
  expect(swipeToggleMock).toHaveBeenCalled();
});

test('should render button to reset skipped sentences', () => {
  render(
    <Settings
      useSwipeReview={true}
      onToggleSwipeReview={swipeToggleMock}
      onResetSkipped={resetSkippedMock}
    />
  );
  expect(screen.getByText('Show all skipped sentences again')).toBeTruthy();
});

test('should not render button to reset skipped sentences if no callback passed', () => {
  render(
    <Settings
      useSwipeReview={true}
      onToggleSwipeReview={swipeToggleMock}
    />
  );
  expect(screen.queryByText('Show all skipped sentences again')).toBeNull();
});

test('should call onResetSkipped when reset button is clicked', async () => {
  render(
    <Settings
      onToggleSwipeReview={swipeToggleMock}
      onResetSkipped={resetSkippedMock}
    />
  );
  await userEvent.click(screen.getByText('Show all skipped sentences again'));
  expect(resetSkippedMock).toHaveBeenCalled();
});

