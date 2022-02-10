import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLocalization } from '../../../tests/test-utils';

import PersonalLanguageInfo from './personal-language-info';

const allLanguages = [
  {
    id: 'en',
    nativeName: 'English',
  },
  {
    id: 'de',
    nativeName: 'Deutsch',
  },
];

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    pendingLanguages: false,
    fetchFailure: false,
  }));
});

test('should render error', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: false,
    fetchFailure: true,
  }));

  await renderWithLocalization(<PersonalLanguageInfo />);
  expect(screen.queryByText(/We failed to fetch available languages./)).toBeTruthy();
});

test('should render if not added languages', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: false,
  }));

  await renderWithLocalization(<PersonalLanguageInfo />);
  expect(screen.getByText('You have not added any languages yet.')).toBeTruthy();
});

test('should render remove button', async () => {
  await renderWithLocalization(<PersonalLanguageInfo />);

  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('remove')).toBeTruthy();
});

test('should disable button while languages are pending', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    pendingLanguages: true,
  }));

  await renderWithLocalization(<PersonalLanguageInfo />);

  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should remove language', async () => {
  await renderWithLocalization(<PersonalLanguageInfo />);

  await userEvent.click(screen.getByRole('button'));
  expect(dispatchMock).toHaveBeenCalled();
});
