import React from 'react';
import { render, screen } from '@testing-library/react';

import LoginButton from './login-button';

test('should render login button if logged out', () => {
  render(<LoginButton authed={false} />);
  expect(screen.getByText('Login / Signup')).toBeTruthy();
});

test('should render logout button when logged in', () => {
  render(<LoginButton authed={true} />);
  expect(screen.getByText('Logout')).toBeTruthy();
});
