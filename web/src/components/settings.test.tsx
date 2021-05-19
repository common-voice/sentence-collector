import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Settings from './settings';

const swipeToggleMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  swipeToggleMock.mockReset();
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

