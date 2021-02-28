import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { uploadSentences } from '../actions/sentences';

import SubmitForm from '../components/submit-form';
import ConfirmForm from '../components/confirm-form';
import ReviewForm from '../components/review-form';

import '../../css/add.css';

const SPLIT_ON = '\n';

function merge(arr1, arr2) {
  return arr1.reduce((accum, cur) => {
    return accum.indexOf(cur) === -1 ? accum.concat([cur]) : accum;
  }, arr2);
}

function getLanguageInput() {
  const input = document.querySelector('#add-form select');
  return input && input.value;
}

function getSentencesInput() {
  const input = document.querySelector('#sentences-input');
  return input && input.value;
}

function getSourceInput() {
  const input = document.querySelector('#source-input');
  return input && input.value;
}

function getConfirmInput() {
  const input = document.querySelector('#agree');
  return input && input.checked;
}

function validateForm() {
  if (!getLanguageInput()) {
    return 'Please select a language.';
  }

  if (!getSentencesInput()) {
    return 'Please add sentences.';
  }

  if (!getSourceInput()) {
    return 'Please add a source.';
  }

  if (!getConfirmInput()) {
    return 'Please confirm that these sentences are public domain.';
  }

  return;
}

function parseSentences() {
  const text = getSentencesInput();
  const sentences = text.split(SPLIT_ON).map(s => s.trim()).filter(Boolean);
  const dedupedSentences = Array.from(new Set(sentences));
  return dedupedSentences;
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

  const onSubmit = (evt) => {
    evt.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return false;
    }

    const sentences = parseSentences();
    setLanguage(getLanguageInput());
    setSource(getSourceInput());
    setSubmitted(sentences);
    setUnreviewed(sentences);
  };

  const onConfirm = async (evt) => {
    evt.preventDefault();

    try {
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
      setMessage(`Submission Error: ${error.message}`);
    }
  };

  const onReview = () => {
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
                        onReview={onReview}
                        submitted={submitted}
                        unreviewed={unreviewed}
                        validated={validated}
                        invalidated={invalidated} />;
  } else {
    // The plain submission form allows copy & pasting
    return <SubmitForm onSubmit={onSubmit}
                       message={message}
                       error={error} />;
  }
}
