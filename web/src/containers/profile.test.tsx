import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import PersonalLanguageInfo from '../components/personal-language-info';
import AddLanguage from '../components/add-language-section';
import Settings from '../components/settings';
import Profile from './profile';

jest.mock('../components/personal-language-info');
jest.mock('../components/add-language-section');
jest.mock('../components/settings');

const dispatchMock = jest.fn();
const username = 'foo';
const allLanguages = [{
  id: 'en',
  name: 'English',
  nativeName: 'English',
}];

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');
  
  (PersonalLanguageInfo as jest.Mock).mockReturnValue(<div>...PersonalLanguageInfo...</div>);
  (AddLanguage as jest.Mock).mockReturnValue(<div>...AddLanguage...</div>);
  (Settings as jest.Mock).mockReturnValue(<div>...Settings...</div>);

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    username,
    allLanguages,
    languages: ['en'],
    userStats: {},
    pendingLanguages: false,
    useSwipeReview: false,
    errorMessage: '',
  }));
});

test('should render username', () => {
  render(<Profile/>);
  expect(screen.getByText(`Profile: ${username}`)).toBeTruthy();
});

test('should render profile components', () => {
  render(<Profile/>);
  expect(screen.getByText('...PersonalLanguageInfo...')).toBeTruthy();
  expect(screen.getByText('...AddLanguage...')).toBeTruthy();
  expect(screen.getByText('...Settings...')).toBeTruthy();
});
