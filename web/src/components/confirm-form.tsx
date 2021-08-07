import React from 'react';

import ReviewLink from './review-link';
import SpinnerButton from './spinner-button';
import { Prompt } from './prompt';

type Props = {
  submitted: string[];
  invalidated: string[];
  validated: string[];
  unreviewed: string[];
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  onReview: () => void;
  isUploadingSentences: boolean;
};

export default function ConfirmForm(props: Props) {
  const {
    submitted,
    invalidated,
    validated,
    unreviewed,
    onSubmit,
    onReview,
    isUploadingSentences,
  } = props;

  const readyCount = submitted.length - invalidated.length;

  return (
    <form onSubmit={onSubmit}>
      <Prompt message="Sentences not submitted, are you sure you want to leave?" when={true} />

      <h2>Confirm New Sentences</h2>
      <p>{`${submitted.length} sentences found.`}</p>

      {invalidated.length > 0 && (
        <p style={{ color: 'red' }}>{`${invalidated.length} rejected by you`}</p>
      )}

      {validated.length + invalidated.length > 0 && (
        <p>
          {`-- ${validated.length + invalidated.length} sentences are already reviewed. Great job!`}
        </p>
      )}

      <p>
        <strong>{`${readyCount} sentences ready for submission!`}</strong>
      </p>

      {unreviewed.length > 0 && (
        <p>
          {`-- ${unreviewed.length} of these sentences are unreviewed. If you want, you can also review your sentences now before submitting them.`}
          &nbsp;
          <ReviewLink onReview={onReview} sentences={unreviewed} />
        </p>
      )}

      <section>
        {isUploadingSentences ? (
          <SpinnerButton></SpinnerButton>
        ) : (
          <button type="submit" className="standalone" disabled={readyCount === 0}>
            Confirm
          </button>
        )}

        {isUploadingSentences && (
          <div>
            <p className="loading-text">
              Sentences are being uploaded. This can take several minutes depending on the number of
              sentences added. Please do not close this website.
            </p>
          </div>
        )}
      </section>
    </form>
  );
}
