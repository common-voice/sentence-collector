// LOCALIZATION VERSION
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Localized } from '@fluent/react';

import {
  loadSentences,
  resetReviewMessage,
  reviewSentences,
  saveSkippedSentences,
} from '../actions/sentences';
import truthyFilter from '../truthyFilter';
import type { RootState, ReviewedState } from '../types';

import LanguageSelector from './language-selector';
import ReviewForm from './review-form';
import ReviewCriteria from './review-criteria';

export const getReviewUrl = (locale: string, language: string | undefined) => {
  const prefix = locale ? `/${locale}` : '';
  const languageToReview = language || '';
  return `${prefix}/review/${languageToReview}`;
};

type ReviewRouteMatch = {
  language: string;
  locale: string;
};

export default function Review() {
  const match = useRouteMatch<ReviewRouteMatch>();
  const history = useHistory();
  const { allLanguages = [], languages = [] } = useSelector((state: RootState) => state.languages);
  const {
    sentencesLoading,
    sentences,
    skippedSentences = [],
    reviewMessage,
  } = useSelector((state: RootState) => state.sentences);

  const [language, setLanguage] = useState(match.params.language || '');
  const [newlySkippedSentences, setNewlySkippedSentences] = useState<number[]>([]);
  const dispatch = useDispatch();

  // If user only has one language possible, use it.
  if (languages.length === 1 && languages[0] !== language) {
    setLanguage(languages[0]);
  }

  useEffect(() => {
    if (language) {
      dispatch(resetReviewMessage());
      dispatch(loadSentences(language));
    }
  }, [language]);

  // If user hasn't added any languages, ask them to do so.
  if (languages.length === 0) {
    return (
      <p>
        <Localized
          id="sc-review-lang-not-selected"
          elems={{
            profileLink: <Link to="/profile"></Link>,
          }}
        >
          You have not selected any languages. Please go to your&nbsp;
          <Link to="/profile">Profile</Link> to select languages.
        </Localized>
      </p>
    );
  }

  const onSelectLanguage = (language: string) => {
    setLanguage(language);
    history.push(getReviewUrl(match.params.locale, language));
  };

  const onReviewed = (reviewedState: ReviewedState) => {
    dispatch(
      reviewSentences(
        {
          validated: reviewedState.validated.map((info) => info.id!),
          invalidated: reviewedState.invalidated.map((info) => info.id!),
        },
        language
      )
    );
    dispatch(saveSkippedSentences(newlySkippedSentences));
  };

  const onSkip = (sentenceId: number) => {
    setNewlySkippedSentences((previousValue) => [...previousValue, sentenceId]);
  };

  const sentencesToReview = sentences
    .filter((sentence) => {
      if (typeof sentence.id !== 'undefined') {
        return !skippedSentences.includes(sentence.id);
      }

      return true;
    })
    .reverse();

  const extendedLanguages = languages
    .map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang))
    .filter(truthyFilter);

  const hasNoSentences =
    language && !sentencesLoading && (!sentencesToReview || sentencesToReview.length < 1);

  return (
    <div>
      <section>
        <Localized id="sc-review-title">
          <h1>Review Sentences</h1>
        </Localized>
        <LanguageSelector
          labelText=""
          languages={extendedLanguages}
          selected={language}
          onChange={onSelectLanguage}
        />
        <ReviewCriteria />
      </section>

      {sentencesLoading && (
        <Localized id="sc-review-loading">
          <p>Loading sentences…</p>
        </Localized>
      )}

      {!language && (
        <Localized id="sc-review-select-language">
          <p>Please select a language to review sentences.</p>
        </Localized>
      )}

      {hasNoSentences && (
        <Localized
          id="sc-review-no-sentences"
          elems={{
            addLink: <Link to={'/add'}></Link>,
          }}
        >
          <p>
            No sentences to review.&nbsp;
            <Link to={'/add'}>Add more sentences now!</Link>
          </p>
        </Localized>
      )}

      {language && !sentencesLoading && sentences && sentences.length > 0 && (
        <ReviewForm
          message={reviewMessage}
          onReviewed={onReviewed}
          onSkip={onSkip}
          sentences={sentencesToReview}
          language={language}
        />
      )}
    </div>
  );
}
