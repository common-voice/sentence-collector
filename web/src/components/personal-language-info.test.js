import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PersonalLanguageInfo from './personal-language-info';

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
  jest.spyOn(redux, 'useDispatch');

  redux.useDispatch.mockImplementation(() => dispatchMock);
  redux.useSelector.mockImplementation(() => ({
    stats: { user: {}},
    allLanguages: [],
    languages: [],
    pendingLanguages: false,
  }));
});

test('should render if not added languages', () => {
  render(<PersonalLanguageInfo/>);
  expect(screen.getByText('You have not added any languages yet.')).toBeTruthy();
});

test('should list languages with stats', () => {
  redux.useSelector.mockImplementation(() => ({
    stats: {
      user: {
        en: {
          added: 5,
        },
        de: {
          added: 2,
        },
      },
    },
    allLanguages: [{
      id: 'en',
      name: 'English',
      nativeName: 'English',
    }, {
      id: 'de',
      name: 'German',
      nativeName: 'Deutsch',
    }],
    languages: ['en', 'de'],
    pendingLanguages: false,
  }));
  render(<PersonalLanguageInfo/>);
  expect(screen.getByText('English (English)')).toBeTruthy();
  expect(screen.getByText('5 added by you')).toBeTruthy();
  expect(screen.getByText('Deutsch (German)')).toBeTruthy();
  expect(screen.getByText('2 added by you')).toBeTruthy();
});

test('should use 0 if no stats', () => {
  redux.useSelector.mockImplementation(() => ({
    stats: {
      user: {},
    },
    allLanguages: [{
      id: 'en',
      name: 'English',
      nativeName: 'English',
    }],
    languages: ['en'],
    pendingLanguages: false,
  }));
  render(<PersonalLanguageInfo/>);
  expect(screen.getByText('English (English)')).toBeTruthy();
  expect(screen.getByText('0 added by you')).toBeTruthy();
});

test('should render remove button', () => {
  redux.useSelector.mockImplementation(() => ({
    stats: {
      user: {},
    },
    allLanguages: [{
      id: 'en',
      name: 'English',
      nativeName: 'English',
    }],
    languages: ['en'],
    pendingLanguages: false,
  }));
  render(<PersonalLanguageInfo/>);
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('remove')).toBeTruthy();
});

test('should disable button while languages are pending', () => {
  redux.useSelector.mockImplementation(() => ({
    stats: {
      user: {},
    },
    allLanguages: [{
      id: 'en',
      name: 'English',
      nativeName: 'English',
    }],
    languages: ['en'],
    pendingLanguages: true,
  }));
  render(<PersonalLanguageInfo/>);
  expect(screen.getByRole('button').disabled).toBeTruthy();
});

test('should dispatch on remove', async () => {
  redux.useSelector.mockImplementation(() => ({
    stats: {
      user: {},
    },
    allLanguages: [{
      id: 'en',
      name: 'English',
      nativeName: 'English',
    }],
    languages: ['en'],
    pendingLanguages: false,
  }));
  render(<PersonalLanguageInfo/>);
  await userEvent.click(screen.getByRole('button'));
  expect(dispatchMock).toHaveBeenCalled();
});
