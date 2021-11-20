import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import LanguageSelector from './language-selector';
import ReviewForm from './review-form';
import ReviewCriteria from './review-criteria';
import Review from './review';

jest.mock('./language-selector');
jest.mock('./review-form');
jest.mock('./review-criteria');

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);

  (LanguageSelector as jest.Mock).mockReturnValue(<div>...LanguageSelector...</div>);
  (ReviewForm as jest.Mock).mockReturnValue(<div>...ReviewForm...</div>);
  (ReviewCriteria as jest.Mock).mockReturnValue(<div>...ReviewCriteria...</div>);
});

test('should set language from single user language', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [
      {
        id: 'de',
        nativeName: 'Deutsch',
      },
    ],
    sentencesLoading: false,
    sentences: [],
  }));
  await renderWithLocalization(<Review />);
  expect(screen.queryByText('Please select a language to review sentences.')).toBeNull();
});

test('should ask to set language', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [],
    sentencesLoading: false,
    sentences: [],
  }));
  await renderWithLocalization(<Review />);
  expect(screen.getByText(/You have not selected any languages./)).toBeTruthy();
});

test('should render loading', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    sentencesLoading: true,
    sentences: [],
  }));
  await renderWithLocalization(<Review />);
  expect(screen.getByText('Loading sentences…')).toBeTruthy();
});

test('should render no language selected', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: ['en', 'de'],
    sentencesLoading: false,
    sentences: [],
  }));
  await renderWithLocalization(<Review />);
  expect(screen.getByText('Please select a language to review sentences.')).toBeTruthy();
});

test('should render no sentences found', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    sentencesLoading: false,
    sentences: [],
  }));
  await renderWithLocalization(<Review />);
  expect(screen.getByText(/No sentences to review./)).toBeTruthy();
});

test('should render no sentences found if all sentences are skipped', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    sentencesLoading: false,
    sentences: [
      {
        id: 1,
        sentence: 'Hi',
      },
    ],
    skippedSentences: [1],
  }));
  await renderWithLocalization(<Review />);
  expect(screen.getByText(/No sentences to review./)).toBeTruthy();
});

test('should render language selector', async () => {
  await renderWithLocalization(<Review />);
  expect(screen.getByText(/LanguageSelector/)).toBeTruthy();
});

test('should render review criteria', async () => {
  await renderWithLocalization(<Review />);
  expect(screen.getByText(/ReviewCriteria/)).toBeTruthy();
});

test('should dispatch load', async () => {
  await renderWithLocalization(<Review />);
  expect(dispatchMock).toHaveBeenCalled();
});

test('should only render form', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [{ id: 'en' }],
    languages: [
      {
        id: 'en',
        nativeName: 'English',
      },
    ],
    sentencesLoading: false,
    sentences: ['Hi'],
    sentencesSuccessfullyReviewedCount: 0,
    showReviewFailure: false,
  }));
  await renderWithLocalization(<Review />);
  expect(screen.getByText(/ReviewForm/)).toBeTruthy();
  expect(screen.queryByText(/You have not selected any languages./)).toBeNull();
  expect(screen.queryByText('Loading sentences…')).toBeNull();
  expect(screen.queryByText('Please select a language to review sentences.')).toBeNull();
  expect(screen.queryByText(/No sentences to review./)).toBeNull();
});
