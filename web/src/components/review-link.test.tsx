import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReviewLink from './review-link';

test('should render review link if enough to review', () => {
  const sentences = ['This is a test.'];
  const onReview = jest.fn();
  render(<ReviewLink sentences={sentences} onReview={onReview}/>);
  expect(screen.queryByText('Review')).toBeTruthy();
});

test('should call onReview on click', async () => {
  const sentences = ['This is a test.'];
  const onReview = jest.fn();
  render(<ReviewLink sentences={sentences} onReview={onReview}/>);
  await userEvent.click(screen.getByRole('link'));
  expect(onReview).toHaveBeenCalled();
});

test('should not render review link', () => {
  const sentences = [];
  render(<ReviewLink sentences={sentences}/>);
  expect(screen.queryByText('Review')).toBeNull();
});
