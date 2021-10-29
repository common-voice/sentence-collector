// LOCALIZATION VERSION
import React from 'react';
import { Localized } from '@fluent/react';

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

  const countOfSentences = submitted.length;
  const countOfInvalidated = invalidated.length;
  const countOfReviewed = validated.length + invalidated.length;
  const readyCount = submitted.length - invalidated.length;
  const countOfUnreviewed = unreviewed.length;

  return (
    <form onSubmit={onSubmit}>
      <Localized id="sc-confirm-are-you-sure" attrs={{ message: true }}>
        <Prompt message="Sentences not submitted, are you sure you want to leave?" when={true} />
      </Localized>

      <Localized id="sc-confirm-sentences-title">
        <h2>Confirm New Sentences</h2>
      </Localized>
      <Localized id="sc-confirm-sentences-found" vars={{ countOfSentences }}>
        <p>{`${submitted.length} sentences found.`}</p>
      </Localized>

      {invalidated.length > 0 && (
        <Localized id="sc-confirm-rejected-by-you" vars={{ countOfInvalidated }}>
          <p style={{ color: 'red' }}>{`${invalidated.length} rejected by you`}</p>
        </Localized>
      )}

      {validated.length + invalidated.length > 0 && (
        <Localized id="sc-confirm-great-job" vars={{ countOfReviewed }}>
          <p>
            {`-- ${
              validated.length + invalidated.length
            } sentences are already reviewed. Great job!`}
          </p>
        </Localized>
      )}

      <Localized id="sc-confirm-ready" vars={{ readyCount }}>
        <p>
          <strong>{`${readyCount} sentences ready for submission!`}</strong>
        </p>
      </Localized>

      {unreviewed.length > 0 && (
        <p>
          <Localized id="sc-confirm-unreviewed" vars={{ countOfUnreviewed }}>
            {`-- ${unreviewed.length} of these sentences are unreviewed. If you want, you can also review your sentences now before submitting them.`}
          </Localized>
          &nbsp;
          <ReviewLink onReview={onReview} sentences={unreviewed} />
        </p>
      )}

      <section>
        {isUploadingSentences ? (
          <SpinnerButton></SpinnerButton>
        ) : (
          <button type="submit" className="standalone" disabled={readyCount === 0}>
            <Localized id="sc-confirm-button-text">Confirm</Localized>
          </button>
        )}

        {isUploadingSentences && (
          <div>
            <Localized id="sc-confirm-uploading">
              <p className="loading-text">
                Sentences are being uploaded. This can take several minutes depending on the number
                of sentences added. Please do not close this website.
              </p>
            </Localized>
          </div>
        )}
      </section>
    </form>
  );
}
