import React from 'react';
import * as redux from 'react-redux';
import { screen } from '@testing-library/react';

import { renderRoute } from '../testUtils';
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

test('should set language from single user language', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: ['de'],
    sentencesLoading: false,
    sentences: []
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.queryByText('Please select a language to review sentences.')).toBeNull();
});

test('should ask to set language', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: [],
    sentencesLoading: false,
    sentences: []
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText(/You have not selected any languages./)).toBeTruthy();
});

test('should render loading', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: ['en'],
    sentencesLoading: true,
    sentences: []
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText('Loading sentences...')).toBeTruthy();
});

test('should render no language selected', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: ['en', 'de'],
    sentencesLoading: false,
    sentences: []
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText('Please select a language to review sentences.')).toBeTruthy();
});

test('should render no sentences found', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: ['en'],
    sentencesLoading: false,
    sentences: []
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText(/No sentences to review./)).toBeTruthy();
});

test('should render no sentences found if all sentences are skipped', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [],
    languages: ['en'],
    sentencesLoading: false,
    sentences: [{
      id: 1,
      sentence: 'Hi',
    }],
    skippedSentences: [1],
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText(/No sentences to review./)).toBeTruthy();
});

test('should render language selector', () => {
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText(/LanguageSelector/)).toBeTruthy();
});

test('should render review criteria', () => {
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText(/ReviewCriteria/)).toBeTruthy();
});

test('should dispatch load', () => {
  renderRoute(<Review match={{}} history={[]} />);
  expect(dispatchMock).toHaveBeenCalled();
});

test('should only render form', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages: [{ id: 'en' }],
    languages: ['en'],
    sentencesLoading: false,
    sentences: ['Hi'],
    reviewMessage: 'Hi',
  }));
  renderRoute(<Review match={{}} history={[]} />);
  expect(screen.getByText(/ReviewForm/)).toBeTruthy();
  expect(screen.queryByText(/You have not selected any languages./)).toBeNull();
  expect(screen.queryByText('Loading sentences...')).toBeNull();
  expect(screen.queryByText('Please select a language to review sentences.')).toBeNull();
  expect(screen.queryByText(/No sentences to review./)).toBeNull();
});
