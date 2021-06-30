import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  loadSentences,
  resetReviewMessage,
  reviewSentences,
  saveSkippedSentences,
} from '../actions/sentences';
import LanguageSelector from '../components/language-selector';
import ReviewForm from '../components/review-form';
import ReviewCriteria from '../components/review-criteria';
import truthyFilter from '../truthyFilter';
import type { RootState, ReviewedState } from '../types';

export const getReviewUrl = (language: string | undefined) => {
  return `/review/${language || ''}`;
};

type RouteMatch = {
  params?: {
    language?: string
  }
}

type LanguageMatchFunction = (params: RouteMatch) => string

const getLanguageFromMatch: LanguageMatchFunction = ({ params = {} } = {}) => {
  // Always return an empty string if no lang specified.
  // This ensures we never have an undefined language.
  let lang = params.language;
  if (!lang) {
    lang = '';
  }
  return lang;
};

type Props = {
  match: RouteMatch
  history: string[]
}

export default function Review({ match, history }: Props) {
  const {
    allLanguages = [],
    languages = [],
  } = useSelector((state: RootState) => state.languages);
  const {
    sentencesLoading,
    sentences,
    skippedSentences = [],
    reviewMessage,
  } = useSelector((state: RootState) => state.sentences);
  const { useSwipeReview } = useSelector((state: RootState) => state.settings);

  const [language, setLanguage] = useState(getLanguageFromMatch(match));
  const [newlySkippedSentences, setNewlySkippedSentences] = useState<number[]>([]);
  const dispatch = useDispatch();

  // If user only has one language possible, use it.
  if (languages.length === 1 && languages[0] !== language) {
    setLanguage(languages[0]);
  }

  // If user hasn't added any languages, ask them to do so.
  if (languages.length === 0) {
    return (
      <p>
        You have not selected any languages. Please go to your&nbsp;
        <Link to="/profile">Profile</Link> to select languages.
      </p>
    );
  }

  useEffect(() => {
    if (language) {
      dispatch(resetReviewMessage());
      dispatch(loadSentences(language));
    }
  }, [language]);

  const onSelectLanguage = (language: string) => {
    setLanguage(language);
    history.push(getReviewUrl(language));
  };

  const onReviewed = (reviewedState: ReviewedState) => {
    dispatch(reviewSentences({
      validated: reviewedState.validated.map((info) => info.id!),
      invalidated: reviewedState.invalidated.map((info) => info.id!),
    }, language));
    dispatch(saveSkippedSentences(newlySkippedSentences));
  };

  const onSkip = (sentenceId: number) => {
    setNewlySkippedSentences((previousValue) => ([...previousValue, sentenceId]));
  };

  const sentencesToReview = sentences.filter((sentence) => {
    if (typeof sentence.id !== 'undefined') {
      return !skippedSentences.includes(sentence.id);
    }

    return true;
  });

  const extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang))
    .filter(truthyFilter);

  const hasNoSentences =
    language &&
    !sentencesLoading &&
    (!sentencesToReview || sentencesToReview.length < 1);

  return (
    <div>
      <section>
        <h1>Review Sentences</h1>
        <LanguageSelector
          labelText=""
          languages={extendedLanguages}
          selected={language}
          onChange={onSelectLanguage}
        />
        <ReviewCriteria/>
      </section>

      { sentencesLoading && (
        <p>Loading sentences...</p>
      )}

      { !language && (
        <p>Please select a language to review sentences.</p>
      )}

      { hasNoSentences && (
        <p>
          No sentences to review.&nbsp;
          <Link to={'/add'}>Add more sentences now!</Link>
        </p>
      )}

      { language && !sentencesLoading && sentences && sentences.length > 0 && (
        <ReviewForm
          message={reviewMessage}
          onReviewed={onReviewed}
          onSkip={onSkip}
          sentences={sentencesToReview}
          language={language}
          useSwipeReview={useSwipeReview} />
      )}
    </div>
  );
}
