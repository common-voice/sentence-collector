import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Settings from './settings';

test('should render title', () => {
  render(<Settings/>);
  expect(screen.getByText('Settings')).toBeTruthy();
});

test('should render error message', () => {
  const errorMessage = 'This is an error';
  render(<Settings useSwipeReview={false} errorMessage={errorMessage}/>);
  expect(screen.getByText(errorMessage)).toBeTruthy();
});

test('should render experimental note', () => {
  render(<Settings/>);
  expect(screen.getByText(/Experimental: There are two different tools with which you can review sentences/)).toBeTruthy();
});

test('should render button to use swipe review tool', () => {
  render(<Settings useSwipeReview={false}/>);
  expect(screen.getByText('Use Swiping Review Tool')).toBeTruthy();
});

test('should render button to use normal review tool', () => {
  render(<Settings useSwipeReview={true}/>);
  expect(screen.getByText('Use Normal Review Tool')).toBeTruthy();
});

test('should call onToggleSwipeReview when review tool button is clicked', async () => {
  const swipeToggleMock = jest.fn();
  render(<Settings onToggleSwipeReview={swipeToggleMock}/>);
  await userEvent.click(screen.getByText('Use Swiping Review Tool'));
  expect(swipeToggleMock).toHaveBeenCalled();
});

