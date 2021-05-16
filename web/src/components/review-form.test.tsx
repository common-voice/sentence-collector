import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
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

const setStateMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  setStateMock.mockReset();

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      state: {
        index: 0,
      },
      setState: setStateMock,
    },
  });
});

describe('Normal Review Tool', () => {
  test('should render normal review tool', () => {
    render(<ReviewForm sentences={sentences}/>);
    expect(screen.queryByText(/Swipe right to approve the sentence/)).toBeNull();
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

  test('should paginate', async () => {
    const onReviewed = jest.fn();
    render(<ReviewForm sentences={sentences} onReviewed={onReviewed}/>);

    expect(screen.getByText('Hi there two')).toBeTruthy();
    await act(async () => await userEvent.click(screen.getByText('>')));
    expect(screen.getByText('Hi there six')).toBeTruthy();
    expect(screen.getByText('Hi there seven')).toBeTruthy();
  });

  test('should call onReviewed with correct status', async () => {
    const onReviewed = jest.fn();
    render(<ReviewForm sentences={sentences} onReviewed={onReviewed}/>);

    await userEvent.click(screen.getAllByText('👍')[0]);
    await userEvent.click(screen.getAllByText('👍')[1]);
    await userEvent.click(screen.getAllByText('👎')[2]);
    // skip
    await userEvent.click(screen.getAllByText('👎')[4]);

    await act(async () => await userEvent.click(screen.getByText('Finish Review')));
    expect(onReviewed).toHaveBeenCalledWith({
      validated: [{
        sentence: 'Hi there',
        source: 'Me',
      }, {
        sentence: 'Hi there two',
        source: 'Me',
      }],
      invalidated: [{
        sentence: 'Hi there three',
        source: 'Me',
      }, {
        sentence: 'Hi there five',
        source: 'Me',
      }],
      unreviewed: [{
        sentence: 'Hi there four',
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
});

// Testing the Swipe Review Form through the ReviewForm here so we can
// test all the logic
describe('Swipe Review Tool', () => {
  test('should render swipe review tool', () => {
    render(<ReviewForm sentences={sentences} useSwipeReview={true}/>);
    expect(screen.getByText(/Swipe right to approve the sentence/)).toBeTruthy();
  });

  test('should render message', () => {
    const message = 'Hi there!';
    render(<ReviewForm sentences={sentences} message={message} useSwipeReview={true}/>);
    expect(screen.getByText(message)).toBeTruthy();
  });

  test('should render message with no sentences', () => {
    const noSentences = [];
    render(<ReviewForm sentences={noSentences} useSwipeReview={true}/>);
    expect(screen.getByText('nothing to review')).toBeTruthy();
  });

  test('should render submit button', () => {
    render(<ReviewForm sentences={sentences} useSwipeReview={true}/>);
    expect(screen.getByText('Finish Review')).toBeTruthy();
  });

  describe('Reviews', () => {
    const fullTestExpectedCategorization = {
      validated: [{
        sentence: 'Hi there two',
        source: 'Me',
      }, {
        sentence: 'Hi there five',
        source: 'Me',
      }],
      invalidated: [{
        sentence: 'Hi there',
        source: 'Me',
      }],
      unreviewed: [{
        sentence: 'Hi there three',
        source: 'Me',
      }, {
        sentence: 'Hi there four',
        source: 'Me',
      }, {
        sentence: 'Hi there six',
        source: 'Me',
      }, {
        sentence: 'Hi there seven',
        source: 'Me',
      }]
    };

    test('should skip sentence on swipe review tool skip button', async () => {
      const onReviewed = jest.fn();
      render(<ReviewForm sentences={[sentences[0]]} onReviewed={onReviewed} useSwipeReview={true}/>);

      await userEvent.click(screen.getByText('Skip'));

      await act(async () => await userEvent.click(screen.getByText('Finish Review')));
      expect(onReviewed).toHaveBeenCalledWith({
        validated: [],
        invalidated: [],
        unreviewed: [{
          sentence: 'Hi there',
          source: 'Me',
        }]
      });
    });

    test('should approve sentence on approve button', async () => {
      const onReviewed = jest.fn();
      render(<ReviewForm sentences={[sentences[0]]} onReviewed={onReviewed} useSwipeReview={true}/>);

      await userEvent.click(screen.getByText('Approve'));

      await act(async () => await userEvent.click(screen.getByText('Finish Review')));
      expect(onReviewed).toHaveBeenCalledWith({
        validated: [{
          sentence: 'Hi there',
          source: 'Me',
        }],
        invalidated: [],
        unreviewed: []
      });
    });

    test('should reject sentence on reject button', async () => {
      const onReviewed = jest.fn();
      render(<ReviewForm sentences={[sentences[0]]} onReviewed={onReviewed} useSwipeReview={true}/>);

      await userEvent.click(screen.getByText('Reject'));

      await act(async () => await userEvent.click(screen.getByText('Finish Review')));
      expect(onReviewed).toHaveBeenCalledWith({
        validated: [],
        invalidated: [{
          sentence: 'Hi there',
          source: 'Me',
        }],
        unreviewed: []
      });
    });

    test('should set state of sentence on multiple button reviews', async () => {
      const onReviewed = jest.fn();
      render(<ReviewForm sentences={sentences} onReviewed={onReviewed} useSwipeReview={true}/>);

      await userEvent.click(screen.getByText('Reject'));
      await userEvent.click(screen.getByText('Approve'));
      await userEvent.click(screen.getByText('Skip'));
      await userEvent.click(screen.getByText('Skip'));
      await userEvent.click(screen.getByText('Approve'));
      await userEvent.click(screen.getByText('Skip'));

      await act(async () => await userEvent.click(screen.getByText('Finish Review')));
      expect(onReviewed).toHaveBeenCalledWith(fullTestExpectedCategorization);
    });

    test('should set state of sentence on multiple keyboard reviews', async () => {
      const onReviewed = jest.fn();
      render(<ReviewForm sentences={sentences} onReviewed={onReviewed} useSwipeReview={true}/>);

      await fireEvent.keyDown(document, { key: 'n' });
      await fireEvent.keyDown(document, { key: 'y' });
      await fireEvent.keyDown(document, { key: 's' });
      await fireEvent.keyDown(document, { key: 's' });
      await fireEvent.keyDown(document, { key: 'y' });
      await fireEvent.keyDown(document, { key: 's' });

      await act(async () => await userEvent.click(screen.getByText('Finish Review')));
      expect(onReviewed).toHaveBeenCalledWith(fullTestExpectedCategorization);
    });
  });

});
