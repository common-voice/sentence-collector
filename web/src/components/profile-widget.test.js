import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProfileWidget from './profile-widget';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
});

test('should not render profile widget if logged out', () => {
  redux.useSelector.mockImplementation(() => ({ authed: false }));
  render(<BrowserRouter><ProfileWidget /></BrowserRouter>);
  expect(screen.queryByText('Logout')).toBeNull();
});

test('should render profile widget when logged in', () => {
  redux.useSelector.mockImplementation(() => ({ authed: true, username: 'testUser' }));
  render(<BrowserRouter><ProfileWidget /></BrowserRouter>);
  expect(screen.getByText('testUser')).toBeTruthy();
  expect(screen.getByText('Logout')).toBeTruthy();
});
