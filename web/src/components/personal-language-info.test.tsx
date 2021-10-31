import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PersonalLanguageInfo from './personal-language-info';

const allLanguages = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
];

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: ['en'],
    pendingLanguages: false,
    userStats: {},
  }));
});

test('should render if not added languages', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: false,
  }));

  render(<PersonalLanguageInfo />);
  expect(screen.getByText('You have not added any languages yet.')).toBeTruthy();
});

test('should list languages with stats', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: ['en', 'de'],
    pendingLanguages: false,
    userStats: {
      en: {
        added: 5,
      },
      de: {
        added: 2,
      },
    },
  }));

  render(<PersonalLanguageInfo />);

  expect(screen.getByText('English')).toBeTruthy();
  expect(screen.getByText('5 added by you')).toBeTruthy();
  expect(screen.getByText('Deutsch')).toBeTruthy();
  expect(screen.getByText('2 added by you')).toBeTruthy();
});

test('should use 0 if no stats', () => {
  render(<PersonalLanguageInfo />);

  expect(screen.getByText('English')).toBeTruthy();
  expect(screen.getByText('0 added by you')).toBeTruthy();
});

test('should render remove button', () => {
  render(<PersonalLanguageInfo />);

  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('remove')).toBeTruthy();
});

test('should disable button while languages are pending', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: ['en'],
    pendingLanguages: true,
    userStats: {},
  }));

  render(<PersonalLanguageInfo />);

  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should remove language', async () => {
  render(<PersonalLanguageInfo />);

  await userEvent.click(screen.getByRole('button'));
  expect(dispatchMock).toHaveBeenCalled();
});
