import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../types';

import { uploadSentences } from '../actions/sentences';

import SubmitForm from '../components/submit-form';
import ConfirmForm from '../components/confirm-form';
import ReviewForm from '../components/review-form';

import '../../css/add.css';

function merge(arr1, arr2) {
  return arr1.reduce((accum, cur) => {
    return accum.indexOf(cur) === -1 ? accum.concat([cur]) : accum;
  }, arr2);
}

export default function Add() {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState('');
  const [source, setSource] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState([]);
  const [unreviewed, setUnreviewed] = useState([]);
  const [reviewing, setReviewing] = useState([]);
  const [validated, setValidated] = useState([]);
  const [invalidated, setInvalidated] = useState([]);

  const {
    allLanguages,
    languages,
  } = useSelector((state: RootState) => state.languages);
  const {
    isUploadingSentences,
    sentenceSubmissionFailures,
  } = useSelector((state: RootState) => state.sentences);

  let extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang)).filter(Boolean);
  if (extendedLanguages.length < 1) {
    extendedLanguages = allLanguages;
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

  const onSubmit = ({ language, sentences, source }) => {
    setLanguage(language);
    setSource(source);
    setSubmitted(sentences);
    setUnreviewed(sentences);
  };

  const onConfirm = async (evt) => {
    evt.preventDefault();

    try {
      // TODO: set up Redux types so that thunk middleware typing works...
      // @ts-ignore
      const { errors, duplicates } = await dispatch(uploadSentences({
        sentences: {
          unreviewed,
          validated,
        },
        locale: language,
        source,
      }));

      if (typeof errors === 'undefined') {
        throw new Error('Unexpected response returned from server');
      }

      resetState();
      setMessage(`Submitted sentences. ${duplicates} sentences were rejected as duplicates.`);
      setError(errors && errors.length > 0 ? `${errors.length} sentences failed` : '');
    } catch (error) {
      resetState();
      setError(`Submission Error: ${error.message}`);
    }
  };

  const onReviewStart = () => {
    setReviewing(unreviewed.map((sentence) => ({ sentence })));
  };

  const onReviewed = (reviewedState) => {
    setReviewing([]);
    setUnreviewed(reviewedState.unreviewed.map((info) => info.sentence));
    setValidated(merge(validated, reviewedState.validated.map((info) => info.sentence)));
    setInvalidated(merge(invalidated, reviewedState.invalidated.map((info) => info.sentence)));
  };

  if (reviewing.length > 0) {
    // The review form allows us to examine, and validate sentences.
    return <ReviewForm onReviewed={onReviewed}
                       sentences={reviewing} />;
  } else if (unreviewed.length > 0 || validated.length > 0 || invalidated.length > 0) {
    // The confirm form is a stats page where sentence submission happens.
    return <ConfirmForm onSubmit={onConfirm}
                        onReview={onReviewStart}
                        submitted={submitted}
                        unreviewed={unreviewed}
                        validated={validated}
                        invalidated={invalidated}
                        isUploadingSentences={isUploadingSentences} />;
  } else {
    // The plain submission form allows copy & pasting
    return <SubmitForm onSubmit={onSubmit}
                       message={message}
                       error={error}
                       languages={extendedLanguages}
                       sentenceSubmissionFailures={sentenceSubmissionFailures} />;
  }
}
