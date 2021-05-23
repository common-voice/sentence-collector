import React from 'react';
import { render, screen } from '@testing-library/react';

import SentenceCollectorInfo from './sentence-collector-info';

test('should render sentence collector info according to input', () => {
  const stats = {
    total: 500,
    languages: 20,
  };
  render(<SentenceCollectorInfo totals={stats}/>);
  expect(screen.queryByText('500')).toBeTruthy();
  expect(screen.queryByText('20')).toBeTruthy();
});

test('should not render sentence collector info without stats', () => {
  render(<SentenceCollectorInfo totals={undefined}/>);
  expect(screen.queryByText('The Common Voice Sentence Collector has')).toBeNull();
});
