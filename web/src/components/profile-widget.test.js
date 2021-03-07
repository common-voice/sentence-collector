import React from 'react';
import { render, screen } from '@testing-library/react';

import ProfileWidget from './profile-widget';

test('should render login button if logged out', () => {
  render(<ProfileWidget authed={false} />);
  expect(screen.getByText('Login / Signup')).toBeTruthy();
});

test('should render logout button when logged in', () => {
  render(<ProfileWidget authed={true} />);
  expect(screen.getByText('Logout')).toBeTruthy();
});
