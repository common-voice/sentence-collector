import React, { useState } from 'react';

import type { ReviewedState, SentenceRecord } from '../types';

import Pager from './pager';
import Sentence from './sentence';
import SubmitButton from './submit-button';
import SwipeReviewForm from './swipe-review-form';

import '../../css/review-form.css';

const PAGE_SIZE = 5;

type Props = {
  sentences: SentenceRecord[]
  onReviewed: (categorizedSentences: ReviewedState) => void
  onSkip: (sentenceId: number) => void
  message?: string
  language?: string
  useSwipeReview?: boolean
}

type ReviewApproval = {
  [key: number]: boolean | undefined
}

export default function ReviewForm({
  message,
  useSwipeReview,
  language,
  sentences,
  onReviewed,
  onSkip,
}: Props) {
  const [page, setPage] = useState(0);
  const [reviewedSentencesCount, setReviewedCount] = useState(0);
  const [reviewApproval, setReviewApproval] = useState<ReviewApproval>({});

  const totalPages = Math.ceil(sentences.length / PAGE_SIZE);
  const lastPage = totalPages - 1;
  const offset = page * PAGE_SIZE;
  const currentSentences = sentences.slice(offset, offset + PAGE_SIZE);

  const onSubmit = async (event: React.MouseEvent | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const categorizedSentences = mapSentencesAccordingToState(sentences, reviewApproval);
    onReviewed(categorizedSentences);
    setReviewApproval({});
  };

  const reviewSentence = (index: number, approval: boolean) => {
    if (reviewApproval[index] === approval) {
      // already set before, deselecting now
      setReviewApproval((previousValue) => ({ ...previousValue, [index]: undefined }));
    } else {
      setReviewApproval((previousValue) => ({ ...previousValue, [index]: approval }));
    }

    setReviewedCount((previousNumber) => previousNumber + 1);
  };

  const skip = (index: number) => {
    const sentence = sentences[index];
    if (typeof sentence.id !== 'undefined') {
      onSkip(sentence.id);
    }
  };

  if (!Array.isArray(sentences) || sentences.length < 1) {
    return null;
  }

  if (useSwipeReview) {
    return (
      <SwipeReviewForm
        onReviewSentence={reviewSentence}
        onSkip={skip}
        onSubmit={onSubmit}
        sentences={sentences}
        page={page}
        lastPage={lastPage}
        offset={offset}
        message={message}
        language={language}
        reviewedSentencesCount={reviewedSentencesCount}
      />
    );
  }

  return (
    <form id="review-form" onSubmit={onSubmit}>
      { message && ( <p>{message}</p> ) }

      { currentSentences.map((sentence, i) => (
        <section id={`sentence-${offset + i}`} key={offset + i} className="validator">
          <div className="sentence-box">
            <Sentence language={language}>{sentence.sentence || sentence}</Sentence>
            <small>{sentence.source ? `Source: ${sentence.source}` : ''}</small>
          </div>
          <div className="button-group">
            <button type="button"
                    className={`${reviewApproval[offset + i] === true ? 'yes' : ''}`}
                    aria-pressed={reviewApproval[offset + i] === true}
                    onClick={() => reviewSentence(offset + i, true)}
                    name={`validate-${offset + i}`}>
              👍
            </button>
            <button type="button"
                    className={`${reviewApproval[offset + i] === false ? 'no' : ''}`}
                    aria-pressed={reviewApproval[offset + i] === false}
                    onClick={() => reviewSentence(offset + i, false)}
                    name={`validate-${offset + i}`}>
              👎
            </button>
          </div>
        </section>
      )) }

      <section className="review-footer">
        <SubmitButton submitText="Finish&nbsp;Review" pendingAction={false}/>
        <Pager page={page} lastPage={lastPage} onPage={setPage} />
      </section>
    </form>
  );
}

function mapSentencesAccordingToState(sentences: SentenceRecord[], reviewApproval: ReviewApproval) {
  return sentences.reduce((acc: ReviewedState, sentence, index: number) => {
    if (reviewApproval[index] === true) {
      acc.validated.push(sentence);
    } else if (reviewApproval[index] === false) {
      acc.invalidated.push(sentence);
    } else {
      acc.unreviewed.push(sentence);
    }

    return acc;
  }, { validated: [], invalidated: [], unreviewed: [] });
}
