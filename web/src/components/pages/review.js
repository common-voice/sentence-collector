import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { loadSentences, resetReviewMessage, reviewSentences } from '../../actions/sentences';
import LanguageSelector from '../language-selector';
import ReviewForm from '../review-form';
import Modal from '../modal';

export const getReviewUrl = (language) => {
  return `/review/${language || ''}`;
};

const getLanguageFromMatch = (match) => {
  // Always return an empty string if no lang specified.
  // This ensures we never have an undefined language.
  let lang = match.params.language;
  if (!lang) {
    lang = '';
  }
  return lang;
};

export default function Review({ match, history }) {
  const [language, setLanguage] = useState(getLanguageFromMatch(match));
  const {
    allLanguages,
    languages,
  } = useSelector((state) => state.languages);
  const {
    sentencesLoading,
    sentences,
    reviewMessage,
  } = useSelector((state) => state.sentences);
  const { useSwipeReview } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  // If user only has one language possible, redirect to it.
  if (languages.length === 1 && languages[0] !== language) {
    return (
      <Redirect to={getReviewUrl(languages[0])} />
    );
  }

  // If user hasn't added any languages, ask them to do so.
  if (!languages || languages.length === 0) {
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

  const onSelectLanguage = (language) => {
    setLanguage(language);
    history.push(getReviewUrl(language));
  };

  const onReviewed = async (reviewedState) => {
    dispatch(reviewSentences({
      validated: reviewedState.validated.map((info) => info.id),
      invalidated: reviewedState.invalidated.map((info) => info.id),
    }));
    dispatch(loadSentences(language));
  };

  const extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang));
  return (
    <div>
      <section>
        <h1>Review Sentences</h1>
        <LanguageSelector name="language-selector-review" languages={extendedLanguages}
                          selected={language} onChange={onSelectLanguage} />
        <Modal text="ⓘ Review Criteria">
          <h2 id="review-criteria">Review Criteria</h2>
          <h3 id="make-sure-the-sentence-meets-the-following-criteria-">Make sure the sentence meets the following criteria:</h3>
          <ol>
            <li>The sentence must be spelled correctly.</li>
            <li>The sentence must be grammatically correct.</li>
            <li>The sentence must be speakable.</li>
            <li>If the sentence meets the criteria, click the &quot;yes&quot; button on the right.</li>
            <li>If the sentence does not meet the above criteria, click the &quot;no&quot; button on the right. If you are unsure about the sentence, you may also skip it and move on to the next one.</li>
            <li>If you run out of sentences to review, please help us collect more sentences!</li>
          </ol>
        </Modal>
      </section>

      { sentencesLoading && (
        <p>Loading sentences...</p>
      )}

      { !language && (
        <p>Please select a language to review sentences.</p>
      )}

      { language && !sentencesLoading && (!sentences || sentences.length < 1) && (
        <p>
          No sentences to review.&nbsp;
          <Link to={'/add'}>Add more sentences now!</Link>
        </p>
      )}

      { language && !sentencesLoading && sentences && sentences.length > 0 && (
        <ReviewForm
          message={reviewMessage}
          onReviewed={onReviewed}
          sentences={sentences}
          useSwipeReview={useSwipeReview} />
      )}
    </div>
  );
}
