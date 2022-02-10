import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@fluent/react';

import { uploadSentences } from '../../actions/sentences';
import type { ReviewedState, RootState, SentenceRecord } from '../../types';

import ReviewForm from '../review/review-form';
import SubmitForm from '../add/submit-form';
import ConfirmForm from '../add/confirm-form';

import '../../../css/add.css';

function merge<T>(arr1: T[], arr2: T[]) {
  return arr1.reduce((accum, cur) => {
    return accum.indexOf(cur) === -1 ? accum.concat([cur]) : accum;
  }, arr2);
}

export default function Add() {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [unreviewed, setUnreviewed] = useState<string[]>([]);
  const [reviewing, setReviewing] = useState<SentenceRecord[]>([]);
  const [validated, setValidated] = useState<string[]>([]);
  const [invalidated, setInvalidated] = useState<string[]>([]);

  const { allLanguages, languages, fetchFailure } = useSelector(
    (state: RootState) => state.languages
  );
  const { isUploadingSentences, sentenceSubmissionFailures } = useSelector(
    (state: RootState) => state.sentences
  );

  let availableLanguages = languages;
  if (availableLanguages.length < 1) {
    availableLanguages = allLanguages;
  }

  const resetState = () => {
    setLanguage('');
    setSource('');
    setMessage('');
    setError('');
    setSubmitted([]);
    setUnreviewed([]);
    setReviewing([]);
    setValidated([]);
    setInvalidated([]);
  };

  type OnSubmitProps = {
    language: string;
    sentences: string[];
    source: string;
  };

  const onSubmit = ({ language, sentences, source }: OnSubmitProps) => {
    setLanguage(language);
    setSource(source);
    setSubmitted(sentences);
    setUnreviewed(sentences);
  };

  const { l10n } = useLocalization();

  const onConfirm = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      // TODO: set up Redux types so that thunk middleware typing works...
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { errors, duplicates } = await dispatch(
        uploadSentences({
          sentences: {
            unreviewed,
            validated,
          },
          locale: language,
          source,
        })
      );

      if (typeof errors === 'undefined') {
        throw new Error(l10n.getString('sc-add-err-unexpected'));
      }

      resetState();
      setMessage(l10n.getString('sc-add-result', { duplicates: duplicates }));
      setError(
        errors && errors.length > 0
          ? l10n.getString('sc-add-err-failed', { sentences: errors.length })
          : ''
      );
    } catch (error) {
      resetState();
      setError(l10n.getString('sc-add-err-submission'));
    }
  };

  const onReviewStart = () => {
    setReviewing(unreviewed.map((sentence) => ({ sentence, source })));
  };

  const onReviewed = (reviewedState: ReviewedState) => {
    setReviewing([]);
    setUnreviewed(reviewedState.unreviewed.map((info) => info.sentence));
    setValidated(
      merge(
        validated,
        reviewedState.validated.map((info) => info.sentence)
      )
    );
    setInvalidated(
      merge(
        invalidated,
        reviewedState.invalidated.map((info) => info.sentence)
      )
    );
  };

  const onSkip = () => {
    // For the "Add" page we do not want to save skipped sentences, as
    // the user might want to review them after submitting...
  };

  if (reviewing.length > 0) {
    // The review form allows us to examine, and validate sentences.
    return (
      <ReviewForm
        onReviewed={onReviewed}
        onSkip={onSkip}
        sentences={reviewing.reverse()}
        language={language}
      />
    );
  } else if (unreviewed.length > 0 || validated.length > 0 || invalidated.length > 0) {
    // The confirm form is a stats page where sentence submission happens.
    return (
      <ConfirmForm
        onSubmit={onConfirm}
        onReview={onReviewStart}
        submitted={submitted}
        unreviewed={unreviewed}
        validated={validated}
        invalidated={invalidated}
        isUploadingSentences={isUploadingSentences}
      />
    );
  }

  return (
    <SubmitForm
      onSubmit={onSubmit}
      message={message}
      error={error}
      languages={availableLanguages}
      sentenceSubmissionFailures={sentenceSubmissionFailures}
      languageFetchFailure={fetchFailure}
    />
  );
}
