import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../../tests/test-utils';

import { LoginSuccess, LoginFailure, LogoutSuccess } from './login';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  dispatchMock.mockReset();

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
});

describe('LoginSuccess', () => {
  test('should dispatch login success', async () => {
    await renderWithLocalization(<LoginSuccess />);
    expect(dispatchMock).toHaveBeenCalled();
  });
});

describe('LoginFailure', () => {
  test('should dispatch login failure and render error', async () => {
    await renderWithLocalization(<LoginFailure />);
    expect(dispatchMock).toHaveBeenCalled();
    expect(screen.getByText('Login failed')).toBeTruthy();
    expect(screen.getByText('Please try again.')).toBeTruthy();
  });
});

describe('LogoutSuccess', () => {
  test('should dispatch logout success', async () => {
    await renderWithLocalization(<LogoutSuccess />);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
