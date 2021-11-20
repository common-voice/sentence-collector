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
import { useLocaleUrl, getReviewUrl } from '../urls';
import type { RootState, ReviewedState } from '../types';

import LanguageSelector from './language-selector';
import ReviewForm from './review-form';
import ReviewCriteria from './review-criteria';

type ReviewRouteMatch = {
  language: string;
  locale: string;
};

export default function Review() {
  const match = useRouteMatch<ReviewRouteMatch>();
  const history = useHistory();
  const { languages = [] } = useSelector((state: RootState) => state.languages);
  const {
    sentencesLoading,
    sentences = [],
    skippedSentences = [],
    sentencesSuccessfullyReviewedCount,
    showReviewFailure,
  } = useSelector((state: RootState) => state.sentences);

  const [language, setLanguage] = useState(match.params.language || '');
  const [newlySkippedSentences, setNewlySkippedSentences] = useState<number[]>([]);
  const dispatch = useDispatch();
  const localizedAddUrl = useLocaleUrl('/add');
  const localizedProfileUrl = useLocaleUrl('/profile');

  // If user only has one language possible, use it.
  if (languages.length === 1 && languages[0].id !== language) {
    setLanguage(languages[0].id);
  }

  useEffect(() => {
    if (language) {
      dispatch(loadSentences(language));
      dispatch(resetReviewMessage());
    }
  }, [language]);

  // If user hasn't added any languages, ask them to do so.
  if (languages.length === 0) {
    return (
      <Localized
        id="sc-review-lang-not-selected"
        elems={{
          profileLink: <Link to={localizedProfileUrl}></Link>,
        }}
      >
        <p></p>
      </Localized>
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

  const hasNoSentences =
    language && !sentencesLoading && (!sentencesToReview || sentencesToReview.length < 1);

  return (
    <div>
      <section>
        <Localized id="sc-review-title">
          <h1></h1>
        </Localized>
        <LanguageSelector
          labelText=""
          languages={languages}
          selected={language}
          onChange={onSelectLanguage}
        />
        <ReviewCriteria />
      </section>

      {sentencesLoading && (
        <Localized id="sc-review-loading">
          <p></p>
        </Localized>
      )}

      {!language && (
        <Localized id="sc-review-select-language">
          <p></p>
        </Localized>
      )}

      {hasNoSentences && (
        <Localized
          id="sc-review-no-sentences"
          elems={{
            addLink: <Link to={localizedAddUrl}></Link>,
          }}
        >
          <p></p>
        </Localized>
      )}

      {language && !sentencesLoading && sentences && sentences.length > 0 && (
        <ReviewForm
          sentencesSuccessfullyReviewedCount={sentencesSuccessfullyReviewedCount}
          showReviewFailure={showReviewFailure}
          onReviewed={onReviewed}
          onSkip={onSkip}
          sentences={sentencesToReview}
          language={language}
        />
      )}
    </div>
  );
}
