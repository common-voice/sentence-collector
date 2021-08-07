import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Header from './header';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
});

test('should not render profile link when logged out', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({ authed: false }));
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.queryByText('Profile')).toBeNull();
});

test('should render profile link when logged in', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({ authed: true }));
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getAllByText('Profile').length >= 1).toBeTruthy();
});

test('should not fail when toggling menu', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({ authed: true }));
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  await userEvent.click(screen.getByRole('checkbox'));
  expect(screen.getAllByText('Profile').length >= 1).toBeTruthy();
});
