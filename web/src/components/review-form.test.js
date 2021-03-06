import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReviewForm from './review-form';

const sentences = [{
  sentence: 'Hi there',
  source: 'Me',
}, {
  sentence: 'Hi there two',
  source: 'Me',
}, {
  sentence: 'Hi there three',
  source: 'Me',
}, {
  sentence: 'Hi there four',
  source: 'Me',
}, {
  sentence: 'Hi there five',
  source: 'Me',
}, {
  sentence: 'Hi there six',
  source: 'Me',
}, {
  sentence: 'Hi there seven',
  source: 'Me',
}];

test('should normal review tool', () => {
  render(<ReviewForm sentences={sentences}/>);
  expect(screen.queryByText(/Swipe right to approve sentence/)).toBeNull();
});

test('should swipe review tool', () => {
  render(<ReviewForm sentences={sentences} useSwipeReview={true}/>);
  expect(screen.getByText(/Swipe right to approve sentence/)).toBeTruthy();
});

test('should render message', () => {
  const message = 'Hi there!';
  render(<ReviewForm sentences={sentences} message={message}/>);
  expect(screen.getByText(message)).toBeTruthy();
});

test('should render message with no sentences', () => {
  const noSentences = [];
  render(<ReviewForm sentences={noSentences}/>);
  expect(screen.getByText('nothing to review')).toBeTruthy();
});

test('should render sentences with source', () => {
  render(<ReviewForm sentences={sentences}/>);
  expect(screen.queryAllByText(/Hi there/).length).toBe(5);
  expect(screen.queryAllByText(/Me/).length).toBe(5);
});

test('should render submit button', () => {
  render(<ReviewForm sentences={sentences}/>);
  expect(screen.getByText('Finish Review')).toBeTruthy();
});

test('should call onReviewed with correct status', async () => {
  const onReviewed = jest.fn();
  render(<ReviewForm sentences={sentences} onReviewed={onReviewed}/>);

  await userEvent.click(screen.getAllByText('👍')[0]);
  await userEvent.click(screen.getAllByText('👍')[1]);
  await userEvent.click(screen.getAllByText('👎')[2]);
  await userEvent.click(screen.getAllByText('👎')[3]);

  await act(async () => await userEvent.click(screen.getByText('Finish Review')));
  expect(onReviewed).toHaveBeenCalledWith({
    validated: [{
      reviewApproval: true,
      sentence: 'Hi there',
      source: 'Me',
    }, {
      reviewApproval: true,
      sentence: 'Hi there two',
      source: 'Me',
    }],
    invalidated: [{
      reviewApproval: false,
      sentence: 'Hi there three',
      source: 'Me',
    }, {
      reviewApproval: false,
      sentence: 'Hi there four',
      source: 'Me',
    }],
    unreviewed: [{
      sentence: 'Hi there five',
      source: 'Me',
    }, {
      sentence: 'Hi there six',
      source: 'Me',
    }, {
      sentence: 'Hi there seven',
      source: 'Me',
    }],
  });
});

test('should paginate', async () => {
  const onReviewed = jest.fn();
  render(<ReviewForm sentences={sentences} onReviewed={onReviewed}/>);

  expect(screen.getByText('Hi there two')).toBeTruthy();
  await act(async () => await userEvent.click(screen.getByText('>')));
  expect(screen.getByText('Hi there six')).toBeTruthy();
  expect(screen.getByText('Hi there seven')).toBeTruthy();
});
