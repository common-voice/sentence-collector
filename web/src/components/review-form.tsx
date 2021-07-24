import React, { useEffect, useRef, useState } from 'react';
import type { ReviewedState, SentenceRecord } from '../types';
import Cards from './swipecard/Cards';
import Card from "./swipecard/CardSwitcher";
import Sentence from './sentence';
import SubmitButton from './submit-button';

import '../../css/review-form.css';

type Props = {
  onReviewed: (categorizedSentences: ReviewedState) => void
  onSkip: (sentenceId: number) => void
  sentences: SentenceRecord[]
  message?: string
  language?: string
}

type ReviewApproval = {
  [key: number]: boolean | undefined
}

export default function SwipeReview(props: Props) {
  const {
    onSkip,
    onReviewed,
    sentences,
    message,
    language,
  } = props;

  const [reviewedSentencesCount, setReviewedCount] = useState(0);
  const [skippedSentencesCount, setSkippedSentencesCount] = useState(0);
  const [reviewApproval, setReviewApproval] = useState<ReviewApproval>({});

  if (!Array.isArray(sentences) || sentences.length === 0) {
    return null;
  }

  const cardsRef = useRef<Cards>(null);

  const submitSentences = () => {
    const categorizedSentences = mapSentencesAccordingToState(sentences, reviewApproval);
    onReviewed(categorizedSentences);
    setReviewApproval({});
  };

  const onSubmit = async (event: React.MouseEvent | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSentences();
  };

  const reviewSentence = (index: number, approval: boolean) => {
    setReviewApproval((previousValue) => ({ ...previousValue, [index]: approval }));
    setReviewedCount((previousNumber) => previousNumber + 1);
  };

  const skip = (index: number) => {
    const sentence = sentences[index];
    if (typeof sentence.id !== 'undefined') {
      onSkip(sentence.id);
    }
    setSkippedSentencesCount((previousNumber) => previousNumber + 1);
  };

  const onReviewButtonPress = (event: React.FormEvent<HTMLButtonElement>, approval: boolean | undefined) => {
    event.preventDefault();
    processReviewOnCurrentCard(approval);
  };

  const processReviewOnCurrentCard = (approval: boolean | undefined) => {
    if (!cardsRef || !cardsRef.current) {
      return;
    }

    const currentIndex = cardsRef.current.state.index;

    if (typeof approval !== 'undefined') {
      reviewSentence(currentIndex, approval);
    } else {
      skip(currentIndex);
    }

    cardsRef.current.setState({ index: currentIndex + 1 });
  };

  useEffect(() => {
    const handler = ({ key }: { key: string }) => {
      if (key === 'y') {
        return processReviewOnCurrentCard(true);
      }

      if (key === 'n') {
        return processReviewOnCurrentCard(false);
      }

      if (key === 's') {
        return processReviewOnCurrentCard(undefined);
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  useEffect(() => {
    if (reviewedSentencesCount + skippedSentencesCount === sentences.length) {
      submitSentences();
    }
  }, [reviewedSentencesCount, skippedSentencesCount]);

  return (
    <form id="review-form" onSubmit={onSubmit}>
      <p>Swipe right to approve the sentence. Swipe left to reject it.</p>
      <p>You have reviewed {reviewedSentencesCount} sentences. Do not forget to submit your review by clicking on the &quot;Finish Review&quot; button below!</p>

      <SubmitButton submitText="Finish&nbsp;Review" pendingAction={false} />

      {message && (<p>{message}</p>)}

      <Cards className="main-root" ref={cardsRef}>
        {sentences.map((sentence, i) => (
          <Card
            key={i}
            onSwipeLeft={() => reviewSentence(i, false)}
            onSwipeRight={() => reviewSentence(i, true)}
          >
            <div className="card-sentence-box">
              <Sentence language={language}>{sentence.sentence || sentence}</Sentence>
              <small className="card-source">{sentence.source ? `Source: ${sentence.source}` : ''}</small>
            </div>
          </Card>
        ))}
      </Cards>

      <section className="card-review-footer">
        <div className="buttons">
          <button className="standalone secondary big" onClick={(event) => onReviewButtonPress(event, false)}>Reject</button>
          <button className="standalone secondary big" onClick={(event) => onReviewButtonPress(event, undefined)}>Skip</button>
          <button className="standalone secondary big" onClick={(event) => onReviewButtonPress(event, true)}>Approve</button>
        </div>
        <p className="small">You can also use Keyboard Shortcuts: Y to Approve, N to Reject, S to Skip</p>
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