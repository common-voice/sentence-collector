import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderRoute } from '../testUtils';
import ConfirmForm from './confirm-form';

const submitted = ['This is a test444.', 'This too!', 'Hi.'];
const invalidated = ['This is a test444.'];
const validated = ['This too.'];
const unreviewed = ['Hi.'];
const onSubmit = jest.fn();
const onReview = jest.fn();

test('should render full form', () => {
  renderRoute(
    <ConfirmForm
      submitted={submitted}
      invalidated={invalidated}
      validated={validated}
      unreviewed={unreviewed}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={false}
    />
  );

  expect(screen.getByText('Confirm New Sentences')).toBeTruthy();
  expect(screen.getByText('3 sentences found.')).toBeTruthy();
  expect(screen.getByText('1 rejected by you')).toBeTruthy();
  expect(screen.getByText(/-- 2 sentences are already reviewed/)).toBeTruthy(); // already reviewed
  expect(screen.getByText('2 sentences ready for submission!')).toBeTruthy();
  expect(screen.getByText(/1 of these sentences are unreviewed/)).toBeTruthy();
  expect(screen.getByText('Confirm')).toBeTruthy();
});

test('should not render review if none to review', () => {
  renderRoute(
    <ConfirmForm
      submitted={submitted}
      invalidated={invalidated}
      validated={validated}
      unreviewed={[]}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={false}
    />
  );

  expect(screen.queryByText(/of these sentences are unreviewed/)).toBeNull();
});

test('should not render invalidated if there are none', () => {
  renderRoute(
    <ConfirmForm
      submitted={submitted}
      invalidated={[]}
      validated={validated}
      unreviewed={unreviewed}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={false}
    />
  );

  expect(screen.queryByText(/rejected by you/)).toBeNull();
});

test('should not render already validated if there are none', () => {
  renderRoute(
    <ConfirmForm
      submitted={submitted}
      invalidated={[]}
      validated={[]}
      unreviewed={unreviewed}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={false}
    />
  );

  expect(screen.queryByText(/sentences are already reviewed/)).toBeNull();
});

test('should render working submit button', async () => {
  onSubmit.mockImplementation((event) => {
    event.preventDefault();
  });

  renderRoute(
    <ConfirmForm
      submitted={submitted}
      invalidated={invalidated}
      validated={validated}
      unreviewed={unreviewed}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={false}
    />
  );

  expect(screen.getByText('Confirm')).toBeTruthy();
  await userEvent.click(screen.getByRole('button'));
  expect(onSubmit).toHaveBeenCalled();
});

test('should disable submit button if no sentences', async () => {
  renderRoute(
    <ConfirmForm
      submitted={[]}
      invalidated={[]}
      validated={[]}
      unreviewed={[]}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={false}
    />
  );

  expect((screen.getByText('Confirm') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should not show submit button while uploading sentences', async () => {
  renderRoute(
    <ConfirmForm
      submitted={[]}
      invalidated={[]}
      validated={[]}
      unreviewed={[]}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={true}
    />
  );

  expect(screen.queryByText('Confirm')).toBeNull();
});

test('should show submission notice while uploading', async () => {
  renderRoute(
    <ConfirmForm
      submitted={[]}
      invalidated={[]}
      validated={[]}
      unreviewed={[]}
      onSubmit={onSubmit}
      onReview={onReview}
      isUploadingSentences={true}
    />
  );

  expect(screen.getByText(/Sentences are being uploaded./)).toBeTruthy();
});
