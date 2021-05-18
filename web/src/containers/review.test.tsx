import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import LanguageSelector from '../components/language-selector';
import ReviewForm from '../components/review-form';
import ReviewCriteria from '../components/review-criteria';
import Review from './review';

jest.mock('../components/language-selector');
jest.mock('../components/review-form');
jest.mock('../components/review-criteria');

const dispatchMock = jest.fn();
const useSelectorMock = redux.useSelector as jest.Mock;

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
  useSelectorMock.mockImplementation(() => ({
    allLanguages: [],
    languages: ['de'],
    sentencesLoading: false,
    sentences: []
  }));
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.queryByText('Please select a language to review sentences.')).toBeNull();
});

test('should ask to set language', () => {
  useSelectorMock.mockImplementation(() => ({
    allLanguages: [],
    languages: [],
    sentencesLoading: false,
    sentences: []
  }));
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText(/You have not selected any languages./)).toBeTruthy();
});

test('should render loading', () => {
  useSelectorMock.mockImplementation(() => ({
    allLanguages: [],
    languages: ['en'],
    sentencesLoading: true,
    sentences: []
  }));
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText('Loading sentences...')).toBeTruthy();
});

test('should render no language selected', () => {
  useSelectorMock.mockImplementation(() => ({
    allLanguages: [],
    languages: ['en', 'de'],
    sentencesLoading: false,
    sentences: []
  }));
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText('Please select a language to review sentences.')).toBeTruthy();
});

test('should render no sentences found', () => {
  useSelectorMock.mockImplementation(() => ({
    allLanguages: [],
    languages: ['en'],
    sentencesLoading: false,
    sentences: []
  }));
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText(/No sentences to review./)).toBeTruthy();
});

test('should render language selector', () => {
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText(/LanguageSelector/)).toBeTruthy();
});

test('should render review criteria', () => {
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText(/ReviewCriteria/)).toBeTruthy();
});

test('should dispatch load', () => {
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(dispatchMock).toHaveBeenCalled();
});

test('should only render form', () => {
  useSelectorMock.mockImplementation(() => ({
    allLanguages: [{ id: 'en' }],
    languages: ['en'],
    sentencesLoading: false,
    sentences: ['Hi'],
    reviewMessage: 'Hi',
    useSwipeReview: false,
  }));
  render(<BrowserRouter><Review match={{}} history={[]}/></BrowserRouter>);
  expect(screen.getByText(/ReviewForm/)).toBeTruthy();
  expect(screen.queryByText(/You have not selected any languages./)).toBeNull();
  expect(screen.queryByText('Loading sentences...')).toBeNull();
  expect(screen.queryByText('Please select a language to review sentences.')).toBeNull();
  expect(screen.queryByText(/No sentences to review./)).toBeNull();
});
