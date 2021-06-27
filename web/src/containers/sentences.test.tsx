import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import MySentencesList from '../components/my-sentences-list';
import MySentences from './sentences';

jest.mock('../components/my-sentences-list');

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    mySentences: [],
    mySentencesLoading: false,
    mySentencesError: '',
  }));
  (MySentencesList as jest.Mock).mockReturnValue(<div>...MySentencesList...</div>);
});

test('should render Rejected', () => {
  render(<MySentences/>);
  expect(screen.getByText('Your sentences')).toBeTruthy();
  expect(screen.getByText('...MySentencesList...')).toBeTruthy();
});

test('should dispatch load', () => {
  render(<MySentences/>);
  expect(dispatchMock).toHaveBeenCalled();
});
