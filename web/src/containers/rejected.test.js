import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import RejectedSentencesList from '../components/rejected-sentences-list';
import Rejected from './rejected';

jest.mock('../components/rejected-sentences-list');

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');

  redux.useDispatch.mockImplementation(() => dispatchMock);
  RejectedSentencesList.mockReturnValue('<div>...RejectedSentencesList...</div>');
});

test('should render Rejected', () => {
  render(<Rejected/>);
  expect(screen.getByText('Your rejected sentences')).toBeTruthy();
});

test('should dispatch load', () => {
  render(<Rejected/>);
  expect(dispatchMock).toHaveBeenCalled();
});
