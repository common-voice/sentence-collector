import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLocalization } from '../../tests/test-utils';

import ReviewForm from './review-form';

const allSentences = [
  {
    id: 1,
    sentence: 'This is a sentence.',
    source: 'Test',
  },
  {
    id: 2,
    sentence: 'This is a second sentence.',
    source: 'Test',
  },
];

const onReviewedMock = jest.fn();
const onSkipMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

test('should approve and reject sentences using buttons', async () => {
  await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={allSentences} />
  );

  await waitFor(() => {
    expect(screen.getByText(allSentences[1].sentence)).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Approve'));
  });

  await waitFor(() => {
    expect(screen.getByText(allSentences[0].sentence)).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Reject'));
  });

  await act(async () => {
    await userEvent.click(screen.getByText('Finish Review'));
  });

  expect(onReviewedMock).toHaveBeenCalledWith({
    validated: [allSentences[1]],
    invalidated: [allSentences[0]],
    unreviewed: [],
  });
});

test('should approve and reject sentences using shortcuts', async () => {
  await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={allSentences} />
  );

  await waitFor(() => {
    expect(screen.getByText(allSentences[1].sentence)).toBeTruthy();
  });
  await act(async () => {
    await fireEvent.keyDown(window, { key: 'y', code: 'y' });
  });

  await waitFor(() => {
    expect(screen.getByText(allSentences[1].sentence)).toBeTruthy();
  });
  await act(async () => {
    await fireEvent.keyDown(window, { key: 'n', code: 'n' });
  });

  await act(async () => {
    await userEvent.click(screen.getByText('Finish Review'));
  });

  expect(onReviewedMock).toHaveBeenCalledWith({
    validated: [allSentences[1]],
    invalidated: [allSentences[0]],
    unreviewed: [],
  });
});

test('should skip sentences using button', async () => {
  await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={allSentences} />
  );

  await waitFor(() => {
    expect(screen.getByText(allSentences[1].sentence)).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Skip'));
  });

  await waitFor(() => {
    expect(screen.getByText(allSentences[0].sentence)).toBeTruthy();
  });

  expect(onSkipMock).toHaveBeenCalledWith(2);
});

test('should skip sentence using shortcut', async () => {
  await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={allSentences} />
  );

  await act(async () => {
    await fireEvent.keyDown(window, { key: 's', code: 's' });
  });

  expect(onSkipMock).toHaveBeenCalledWith(2);
});

test('should not mark anything as validated or invalidated if no review done', async () => {
  await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={allSentences} />
  );

  await waitFor(() => {
    expect(screen.getByText(allSentences[1].sentence)).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Finish Review'));
  });

  await waitFor(() => {
    expect(screen.getByText(allSentences[0].sentence)).toBeTruthy();
  });

  expect(onReviewedMock).toHaveBeenCalledWith({
    validated: [],
    invalidated: [],
    unreviewed: allSentences,
  });
});

test('should submit review at end of review queue', async () => {
  await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={allSentences} />
  );

  await waitFor(() => {
    expect(screen.getByText(allSentences[1].sentence)).toBeTruthy();
  });
  await act(async () => {
    await fireEvent.keyDown(window, { key: 'y', code: 'y' });
  });

  await waitFor(() => {
    expect(screen.getByText(allSentences[0].sentence)).toBeTruthy();
  });
  await act(async () => {
    await fireEvent.keyDown(window, { key: 'y', code: 'y' });
  });

  expect(onReviewedMock).toHaveBeenCalled();
});

test('should return empty component if no sentences', async () => {
  const { container } = await renderWithLocalization(
    <ReviewForm onReviewed={onReviewedMock} onSkip={onSkipMock} sentences={[]} />
  );

  expect(container.children.length).toBe(0);
});

test('should show reviewed message', async () => {
  await renderWithLocalization(
    <ReviewForm
      onReviewed={onReviewedMock}
      onSkip={onSkipMock}
      sentences={allSentences}
      sentencesSuccessfullyReviewedCount={2}
    />
  );

  expect(screen.getByText(/\u20682\u2069 sentences reviewed/)).toBeTruthy();
});

test('should show reviewed error', async () => {
  await renderWithLocalization(
    <ReviewForm
      onReviewed={onReviewedMock}
      onSkip={onSkipMock}
      sentences={allSentences}
      showReviewFailure={true}
    />
  );

  expect(screen.getByText(/Review could not be saved/)).toBeTruthy();
});
