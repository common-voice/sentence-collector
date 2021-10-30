import React, { useEffect, useMemo, useState } from 'react';
import type { ReviewedState, SentenceRecord } from '../types';
import TinderCard from 'react-tinder-card';
import { Localized } from '@fluent/react';

import Sentence from './sentence';
import SubmitButton from './submit-button';
import { Prompt } from './prompt';

import '../../css/review-form.css';

type Props = {
  onReviewed: (categorizedSentences: ReviewedState) => void;
  onSkip: (sentenceId: number) => void;
  sentences: SentenceRecord[];
  message?: string;
  language?: string;
};

type ReviewApproval = {
  [key: number]: boolean | undefined;
};

export default function SwipeReview(props: Props) {
  const { onSkip, onReviewed, sentences = [], message, language } = props;

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(sentences.length - 1);
  const [reviewedSentencesCount, setReviewedCount] = useState(0);
  const [skippedSentencesCount, setSkippedSentencesCount] = useState(0);
  const [reviewApproval, setReviewApproval] = useState<ReviewApproval>({});

  const cardsRefs = useMemo(
    () =>
      Array(sentences.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const APPROVAL_DIRECTIONS: Record<string, boolean> = {
    left: false,
    right: true,
  };

  const submitSentences = () => {
    const categorizedSentences = mapSentencesAccordingToState(sentences, reviewApproval);
    onReviewed(categorizedSentences);
    setReviewApproval({});
  };

  const onSubmit = async (event: React.MouseEvent | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSentences();
  };

  const handleSwipe = (index: number, direction: string) => {
    if (APPROVAL_DIRECTIONS[direction] === undefined) {
      if (direction === 'up') {
        skip(index);
        setCurrentSentenceIndex((previousIndex) => previousIndex - 1);
      }

      // Downwards direction is not implemented, therefore we
      // don't want to do anything in those cases
      return;
    }

    reviewSentence(index, APPROVAL_DIRECTIONS[direction]);
    setCurrentSentenceIndex((previousIndex) => previousIndex - 1);
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

  const onReviewButtonPress = (
    event: React.FormEvent<HTMLButtonElement>,
    approval: boolean | undefined
  ) => {
    event.preventDefault();
    processButtonPressOnCurrentCard(approval);
  };

  const processButtonPressOnCurrentCard = async (approval: boolean | undefined) => {
    let direction;

    if (typeof approval !== 'undefined') {
      direction = approval ? 'right' : 'left';
    } else {
      direction = 'up';
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await cardsRefs[currentSentenceIndex].current.swipe(direction);
    } catch (error) {
      // If the swipe failed we either could not process the swipe at all
      // or it was the last card leading to an error on the card as the
      // component gets unmounted at the same time due to no sentences
      // being left to review. In both cases we can ignore this error.
    }
  };

  useEffect(() => {
    const handler = ({ key }: { key: string }) => {
      key = key.toLowerCase(); // Fixes https://github.com/common-voice/sentence-collector/issues/487
      if (key === 'y') {
        return processButtonPressOnCurrentCard(true);
      }

      if (key === 'n') {
        return processButtonPressOnCurrentCard(false);
      }

      if (key === 's') {
        return processButtonPressOnCurrentCard(undefined);
      }
    };

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [currentSentenceIndex]);

  useEffect(() => {
    if (
      sentences.length !== 0 &&
      reviewedSentencesCount + skippedSentencesCount === sentences.length
    ) {
      submitSentences();
    }
  }, [reviewedSentencesCount, skippedSentencesCount]);

  if (sentences.length === 0) {
    return null;
  }

  return (
    <form id="review-form" onSubmit={onSubmit}>
      <Localized id="sc-review-title" attrs={{ message: true }}> 
        <Prompt
          when={reviewedSentencesCount > 0}
          message="Reviewed sentences not submitted, are sure?"
        />
      </Localized>

      {/* TODO & TO CHECK : Do these messages need translation?  */}
      {message && <p>{message}</p>}

      <p className="small">
        <Localized id="sc-review-form-usage-1"> 
          Swipe right to approve the sentence. Swipe left to reject it. Swipe up to skip it.
        </Localized>
        {' '}
        <Localized id="sc-review-form-usage-2"> 
          <strong>Do not forget to submit your review!</strong>
        </Localized>
      </p>
      <section className="cards-container">
        {sentences.map((sentence, i) => (
          <TinderCard
            key={i}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={cardsRefs[i]}
            onSwipe={(direction) => handleSwipe(i, direction)}
            preventSwipe={['down']}
          >
            <div className="swipe card-sentence-box">
              <Sentence language={language}>{sentence.sentence || sentence}</Sentence>
              <small className="card-source">
                {sentence.source ?
                  <Localized id="sc-review-form-source" vars={{ sentenceSource: sentence.source }}>
                    <span>`Source: ${sentence.source}`</span>
                  </Localized>
                   : ''
                }
              </small>
            </div>
          </TinderCard>
        ))}
      </section>

      <section className="card-review-buttons-section">
        <div className="buttons">
          <button
            className="standalone secondary big"
            onClick={(event) => onReviewButtonPress(event, false)}
          >
            <Localized id="sc-review-form-button-reject">
              Reject
            </Localized>
          </button>
          <button
            className="standalone secondary big"
            onClick={(event) => onReviewButtonPress(event, undefined)}
          >
            <Localized id="sc-review-form-button-skip">
              Skip
            </Localized>
          </button>
          <button
            className="standalone secondary big"
            onClick={(event) => onReviewButtonPress(event, true)}
          >
            <Localized id="sc-review-form-button-approve">
              Approve
            </Localized>
          </button>
        </div>
      </section>

      <section className="review-footer">
        <p className="small">
          <Localized id="sc-review-form-keyboard-usage">
            You can also use Keyboard Shortcuts: Y to Approve, N to Reject, S to Skip
          </Localized>
        </p>
        <Localized id="sc-review-form-button-submit" attrs= {{ submitText: true }}>
          <SubmitButton submitText="Finish&nbsp;Review" pendingAction={false} />
        </Localized>
      </section>
    </form>
  );
}

function mapSentencesAccordingToState(sentences: SentenceRecord[], reviewApproval: ReviewApproval) {
  return sentences.reduce(
    (acc: ReviewedState, sentence, index: number) => {
      if (reviewApproval[index] === true) {
        acc.validated.push(sentence);
      } else if (reviewApproval[index] === false) {
        acc.invalidated.push(sentence);
      } else {
        acc.unreviewed.push(sentence);
      }

      return acc;
    },
    { validated: [], invalidated: [], unreviewed: [] }
  );
}
