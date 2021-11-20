import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../../tests/test-utils';

import AddLanguage from '../profile/add-language-section';
import PersonalLanguageInfo from '../profile/personal-language-info';
import Settings from '../profile/settings';
import Profile from './profile';

jest.mock('../profile/personal-language-info');
jest.mock('../profile/add-language-section');
jest.mock('../profile/settings');

const username = 'foo';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');

  (PersonalLanguageInfo as jest.Mock).mockReturnValue(<div>...PersonalLanguageInfo...</div>);
  (AddLanguage as jest.Mock).mockReturnValue(<div>...AddLanguage...</div>);
  (Settings as jest.Mock).mockReturnValue(<div>...Settings...</div>);

  (redux.useSelector as jest.Mock).mockImplementation(() => ({ username }));
});

test('should render username', async () => {
  await renderWithLocalization(<Profile />);
  expect(screen.getByText(`Profile: \u2068${username}\u2069`)).toBeTruthy();
});

test('should render profile components', async () => {
  await renderWithLocalization(<Profile />);
  expect(screen.getByText('...PersonalLanguageInfo...')).toBeTruthy();
  expect(screen.getByText('...AddLanguage...')).toBeTruthy();
  expect(screen.getByText('...Settings...')).toBeTruthy();
});
