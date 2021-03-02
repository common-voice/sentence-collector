import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Settings from './settings';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  redux.useDispatch.mockImplementation(() => dispatchMock);
  redux.useSelector.mockImplementation(() => ({ useSwipeReview: false, errorMessage: '' }));
});

test('should render title', () => {
  render(<Settings/>);
  expect(screen.getByText('Settings')).toBeTruthy();
});

test('should render error message', () => {
  const errorMessage = 'This is an error';
  redux.useSelector.mockImplementation(() => ({ useSwipeReview: false, errorMessage }));
  render(<Settings/>);
  expect(screen.getByText(errorMessage)).toBeTruthy();
});

test('should render experimental note', () => {
  render(<Settings/>);
  expect(screen.getByText(/Experimental: There are two different tools with which you can review sentences/)).toBeTruthy();
});

test('should render button to use swipe review tool', () => {
  redux.useSelector.mockImplementation(() => ({ useSwipeReview: false, errorMessage: '' }));
  render(<Settings/>);
  expect(screen.getByText('Use Swiping Review Tool')).toBeTruthy();
});

test('should render button to use normal review tool', () => {
  redux.useSelector.mockImplementation(() => ({ useSwipeReview: true, errorMessage: '' }));
  render(<Settings/>);
  expect(screen.getByText('Use Normal Review Tool')).toBeTruthy();
});

test('should dispatch action when review tool button is clicked', async () => {
  redux.useSelector.mockImplementation(() => ({ useSwipeReview: false, errorMessage: '' }));
  render(<Settings/>);
  await userEvent.click(screen.getByText('Use Swiping Review Tool'));
  expect(dispatchMock).toHaveBeenCalled();
});

