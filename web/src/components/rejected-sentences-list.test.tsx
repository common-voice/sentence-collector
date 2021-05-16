import React from 'react';
import { render, screen } from '@testing-library/react';

import RejectedSentencesList from './rejected-sentences-list';

test('should render loading notice', () => {
  render(<RejectedSentencesList sentences={[]} loading={true}/>);
  expect(screen.getByText('Loading rejected sentences..')).toBeTruthy();
});

test('should render error', () => {
  const errorMessage = 'Oh no!';
  render(<RejectedSentencesList error={errorMessage}/>);
  expect(screen.getByText(`Error while fetching rejected sentences: ${errorMessage}`)).toBeTruthy();
});

test('should render no sentences found notice', () => {
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

  render(<RejectedSentencesList sentences={rejectedSentences}/>);

  expect(screen.getByText('de')).toBeTruthy();
  expect(screen.getByText('I failed.')).toBeTruthy();
  expect(screen.getByText('I failed too.')).toBeTruthy();
  expect(screen.getByText('I failed miserably.')).toBeTruthy();
});
