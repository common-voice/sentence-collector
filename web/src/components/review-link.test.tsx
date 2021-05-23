import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReviewLink from './review-link';

const onReview = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  onReview.mockReset();
});

test('should render review link if enough to review', () => {
  const sentences = ['This is a test.'];
  render(<ReviewLink sentences={sentences} onReview={onReview}/>);
  expect(screen.queryByText('Review')).toBeTruthy();
});

test('should call onReview on click', async () => {
  const sentences = ['This is a test.'];
  render(<ReviewLink sentences={sentences} onReview={onReview}/>);
  await userEvent.click(screen.getByRole('link'));
  expect(onReview).toHaveBeenCalled();
});

test('should not render review link', () => {
  const sentences: string[] = [];
  render(<ReviewLink sentences={sentences} onReview={onReview}/>);
  expect(screen.queryByText('Review')).toBeNull();
});
