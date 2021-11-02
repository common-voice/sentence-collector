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

  const countOfReviewed = validated.length + invalidated.length;
  const readyCount = submitted.length - invalidated.length;

  return (
    <form onSubmit={onSubmit}>
      <Localized id="sc-confirm-are-you-sure" attrs={{ message: true }}>
        <Prompt message="" when={true} />
      </Localized>

      <Localized id="sc-confirm-sentences-title">
        <h2></h2>
      </Localized>
      <Localized id="sc-confirm-sentences-found" vars={{ countOfSentences: submitted.length }}>
        <p></p>
      </Localized>

      <Localized id="sc-confirm-ready" vars={{ readyCount }}>
        <strong></strong>
      </Localized>

      <ul>
        {invalidated.length > 0 && (
          <Localized
            id="sc-confirm-rejected-by-you"
            vars={{ countOfInvalidated: invalidated.length }}
          >
            <li style={{ color: 'red' }}></li>
          </Localized>
        )}

        {validated.length + invalidated.length > 0 && (
          <Localized id="sc-confirm-already-reviewed" vars={{ countOfReviewed }}>
            <li></li>
          </Localized>
        )}

        {unreviewed.length > 0 && (
          <li>
            <Localized id="sc-confirm-unreviewed" vars={{ countOfUnreviewed: unreviewed.length }} />
          </li>
        )}
      </ul>

      <section>
        {isUploadingSentences ? (
          <SpinnerButton></SpinnerButton>
        ) : (
          <button type="submit" className="standalone" disabled={readyCount === 0}>
            <Localized id="sc-confirm-button-text" />
          </button>
        )}

        {isUploadingSentences && (
          <div>
            <Localized id="sc-confirm-uploading">
              <p className="loading-text"></p>
            </Localized>
          </div>
        )}
      </section>
    </form>
  );
}
