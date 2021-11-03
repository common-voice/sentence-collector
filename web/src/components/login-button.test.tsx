import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import LoginButton from './login-button';

test('should render login button if logged out', async () => {
  await renderWithLocalization(<LoginButton authed={false} />);
  expect(screen.getByText('Login / Signup')).toBeTruthy();
});

test('should render logout button when logged in', async () => {
  await renderWithLocalization(<LoginButton authed={true} />);
  expect(screen.getByText('Logout')).toBeTruthy();
});
