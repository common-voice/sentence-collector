import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
});

test('should not render profile link when logged out', () => {
  redux.useSelector.mockImplementation(() => ({ authed: false }));
  render(<BrowserRouter><Header /></BrowserRouter>);
  expect(screen.queryByText('Profile')).toBeNull();
});

test('should render profile link when logged in', () => {
  redux.useSelector.mockImplementation(() => ({ authed: true }));
  render(<BrowserRouter><Header /></BrowserRouter>);
  expect(screen.getByText('Profile')).toBeTruthy();
});
