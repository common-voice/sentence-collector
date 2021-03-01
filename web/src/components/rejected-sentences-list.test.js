import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import RejectedSentencesList from './rejected-sentences-list';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
});

test('should render loading notice', () => {
  redux.useSelector.mockImplementation(() => ({
    rejectedSentences: [],
    rejectedSentencesLoading: true,
  }));
  render(<RejectedSentencesList/>);
  expect(screen.getByText('Loading rejected sentences..')).toBeTruthy();
});

test('should render error', () => {
  const errorMessage = 'Oh no!';
  redux.useSelector.mockImplementation(() => ({
    rejectedSentences: [],
    rejectedSentencesLoading: false,
    rejectedSentencesError: errorMessage,
  }));
  render(<RejectedSentencesList/>);
  expect(screen.getByText(`Error while fetching rejected sentences: ${errorMessage}`)).toBeTruthy();
});

test('should render no sentences found notice', () => {
  redux.useSelector.mockImplementation(() => ({
    rejectedSentences: [],
    rejectedSentencesLoading: false,
  }));
  render(<RejectedSentencesList/>);
  expect(screen.getByText('No rejected sentences found!')).toBeTruthy();
});

test('should render sentences', () => {
  const rejectedSentences = {
    de: [{
      id: 1,
      sentence: 'I failed.',
    }, {
      id: 2,
      sentence: 'I failed too.',
    }],
    en: [{
      id: 3,
      sentence: 'I failed miserably.',
    }],
  };

  redux.useSelector.mockImplementation(() => ({
    rejectedSentences,
    rejectedSentencesLoading: false,
  }));

  render(<RejectedSentencesList/>);
  expect(screen.getByText('de')).toBeTruthy();
  expect(screen.getByText('I failed.')).toBeTruthy();
  expect(screen.getByText('I failed too.')).toBeTruthy();
  expect(screen.getByText('I failed miserably.')).toBeTruthy();
});
