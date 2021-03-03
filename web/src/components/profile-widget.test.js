import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProfileWidget from './profile-widget';

test('should not render profile widget if logged out', () => {
  render(<BrowserRouter><ProfileWidget authed={false} /></BrowserRouter>);
  expect(screen.queryByText('Logout')).toBeNull();
});

test('should render profile widget when logged in', () => {
  render(<BrowserRouter><ProfileWidget authed={true} username="testUser" /></BrowserRouter>);
  expect(screen.getByText('testUser')).toBeTruthy();
  expect(screen.getByText('Logout')).toBeTruthy();
});
