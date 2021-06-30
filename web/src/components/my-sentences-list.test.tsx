import React from 'react';
import { render, screen } from '@testing-library/react';

import MySentencesList from './my-sentences-list';

const deleteMock = jest.fn();
const selectMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  deleteMock.mockReset();
  selectMock.mockReset();
});

test('should render loading notice', () => {
  render(
    <MySentencesList
      sentences={{}}
      loading={true}
      error=""
      deleteSentencesError=""
      deleteSentencesLoading={false}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.getByText('Loading your sentences..')).toBeTruthy();
});

test('should render error', () => {
  const errorMessage = 'Oh no!';
  render(
    <MySentencesList
      error={errorMessage}
      sentences={{}}
      loading={false}
      deleteSentencesError=""
      deleteSentencesLoading={false}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.getByText(`Error while fetching your sentences: ${errorMessage}`)).toBeTruthy();
});

test('should render no sentences found notice', () => {
  render(
    <MySentencesList
      sentences={{}}
      error=""
      loading={false}
      deleteSentencesError=""
      deleteSentencesLoading={false}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.getByText('No sentences found!')).toBeTruthy();
});

test('should render sentences', () => {
  const sentences = {
    de: {
      '1': {
        source: 'foo',
        sentences: [{
          id: 1,
          sentence: 'I failed.',
        }, {
          id: 2,
          sentence: 'I failed too.',
        }],
      },
    },
  };

  render(
    <MySentencesList
      sentences={sentences}
      error=""
      loading={false}
      deleteSentencesError=""
      deleteSentencesLoading={false}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );

  expect(screen.getByText('de')).toBeTruthy();
  expect(screen.getByText('Submission: 1')).toBeTruthy();
  expect(screen.getByText('Source: foo')).toBeTruthy();
  expect(screen.getByText('I failed.')).toBeTruthy();
  expect(screen.getByText('I failed too.')).toBeTruthy();
});

test('should render delete button', () => {
  const sentences = {
    de: {
      '1': {
        source: 'foo',
        sentences: [{
          id: 1,
          sentence: 'Hi.',
        }],
      },
    },
  };

  render(
    <MySentencesList
      sentences={sentences}
      loading={false}
      error=""
      deleteSentencesError=""
      deleteSentencesLoading={false}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.getByText('Delete selected sentences')).toBeTruthy();
});

test('should not render delete button if no sentences', () => {
  render(
    <MySentencesList
      sentences={{}}
      loading={false}
      error=""
      deleteSentencesError=""
      deleteSentencesLoading={false}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.queryByText('Delete selected sentences')).toBeNull();
});

test('should render delete loading notice', () => {
  render(
    <MySentencesList
      sentences={{}}
      loading={false}
      error=""
      deleteSentencesError=""
      deleteSentencesLoading={true}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.getByText('Deleting selected sentences...')).toBeTruthy();
});

test('should render delete error', () => {
  render(
    <MySentencesList
      sentences={{}}
      loading={false}
      error=""
      deleteSentencesError="Will be ignored and replaced by generic error message"
      deleteSentencesLoading={true}
      onDelete={deleteMock}
      onSelectSentence={selectMock}
    />
  );
  expect(screen.getByText('Failed to delete selected sentences.. Please try again!')).toBeTruthy();
});
