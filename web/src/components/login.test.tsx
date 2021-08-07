import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { LoginSuccess, LoginFailure, LogoutSuccess } from './login';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  dispatchMock.mockReset();

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
});

describe('LoginSuccess', () => {
  test('should dispatch login success', () => {
    render(
      <BrowserRouter>
        <LoginSuccess />
      </BrowserRouter>
    );
    expect(dispatchMock).toHaveBeenCalled();
  });
});

describe('LoginFailure', () => {
  test('should dispatch login failure and render error', () => {
    render(
      <BrowserRouter>
        <LoginFailure />
      </BrowserRouter>
    );
    expect(dispatchMock).toHaveBeenCalled();
    expect(screen.getByText('Login failed')).toBeTruthy();
    expect(screen.getByText('Please try again.')).toBeTruthy();
  });
});

describe('LogoutSuccess', () => {
  test('should dispatch logout success', () => {
    render(
      <BrowserRouter>
        <LogoutSuccess />
      </BrowserRouter>
    );
    expect(dispatchMock).toHaveBeenCalled();
  });
});
