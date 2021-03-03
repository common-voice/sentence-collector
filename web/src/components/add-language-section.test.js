import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import LanguageSelector from './language-selector';
import AddLanguageSection from './add-language-section';

jest.mock('./language-selector');

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
  jest.spyOn(redux, 'useDispatch');

  LanguageSelector.mockReturnValue(<div>...LanguageSelector...</div>);
  redux.useDispatch.mockImplementation(() => dispatchMock);
  redux.useSelector.mockImplementation(() => ({
    allLanguages: [],
    languages: [],
    pendingLanguages: false,
  }));
});

test('should render submit button', () => {
  render(<AddLanguageSection/>);
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('Add')).toBeTruthy();
});

test('should render selector', () => {
  render(<AddLanguageSection/>);
  expect(screen.getByText('...LanguageSelector...')).toBeTruthy();
});
