import React, { useEffect, useRef } from 'react';
import type { SentenceWithSource } from '../types';
import Cards from './swipecard/Cards';
import Card from "./swipecard/CardSwitcher";
import Sentence from './sentence';
import SubmitButton from './submit-button';

type Props = {
  onReviewSentence: (index: number, approval: boolean) => void
  onSubmit: (config: { preventDefault?: () => void }) => void
  sentences: SentenceWithSource[]
  page: number
  lastPage: number
  offset: number
  message?: string
  language?: string
  reviewedSentencesCount: number
}

export default function SwipeReview(props: Props) {
  const {
    onReviewSentence,
    onSubmit,
    sentences,
    page,
    lastPage,
    offset,
    message,
    language,
    reviewedSentencesCount,
  } = props;

  const cardsRef = useRef<Cards>(null);

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
      onReviewSentence(currentIndex, approval);
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

  return (
    <form id="review-form" onSubmit={onSubmit}>
      <p>Swipe right to approve the sentence. Swipe left to reject it.</p>
      <p>You have reviewed {reviewedSentencesCount} sentences. Do not forget to submit your review by clicking on the &quot;Finish Review&quot; button below!</p>

      <SubmitButton submitText="Finish&nbsp;Review" pendingAction={false}/>

      { message && ( <p>{message}</p> ) }

      <Cards onEnd={() => {
        if (page === lastPage) {
          onSubmit({ preventDefault: () => { /* ignore */ } });
        }
      }} className="main-root" ref={cardsRef}>
        { sentences.map((sentence, i) => (
          <Card
            key={offset + i}
            onSwipeLeft={() => onReviewSentence(i, false)}
            onSwipeRight={() => onReviewSentence(i, true)}
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