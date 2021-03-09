import React, { useState } from 'react';

import Cards from './swipecard/Cards';
import Card from "./swipecard/CardSwitcher";
import Pager from './pager';
import SubmitButton from './submit-button';

import '../../css/review-form.css';

const PAGE_SIZE = 5;

function mapSentencesIntoCategories(sentences) {
  let validated = [];
  let invalidated = [];
  const unreviewed = sentences.filter((sentenceInfo) => {
    if (sentenceInfo.reviewApproval) {
      validated.push(sentenceInfo);
      return false;
    }

    if (sentenceInfo.reviewApproval === false) {
      invalidated.push(sentenceInfo);
      return false;
    }

    return true;
  });

  return {
    validated,
    invalidated,
    unreviewed,
  };
}

export default function ReviewForm({ message, useSwipeReview, sentences: initialSentences, onReviewed }) {
  const [page, setPage] = useState(0);
  const [sentences, setSentences] = useState(initialSentences);
  const [reviewedSentencesCount, setReviewedCount] = useState(0);

  const totalPages = Math.ceil(sentences.length / PAGE_SIZE);
  const lastPage = totalPages - 1;
  const offset = page * PAGE_SIZE;

  const onSubmit = async (event) => {
    event.preventDefault();

    onReviewed(mapSentencesIntoCategories(sentences));
  };

  const reviewSentence = (index, approval) => {
    const allSentences = [...sentences];
    if (allSentences[index].reviewApproval === approval) {
      // already set before, deselecting now
      allSentences[index].reviewApproval = undefined;
    } else {
      allSentences[index].reviewApproval = approval;
    }

    setSentences(allSentences);
    setReviewedCount((previousNumber) => previousNumber + 1);
  };

  if (!Array.isArray(sentences) || sentences.length < 1) {
    return <h2>nothing to review</h2>;
  }

  const currentSentences = sentences.slice(offset, offset + PAGE_SIZE);

  if (useSwipeReview) {
    const cardsRef = React.createRef();

    const skip = (event) => {
      event.preventDefault();
      const currentIndex = cardsRef.current.state.index;
      cardsRef.current.setState({ index: currentIndex + 1 });
    };

    const onReviewButtonPress = (event, approval) => {
      event.preventDefault();
      const currentIndex = cardsRef.current.state.index;
      reviewSentence(currentIndex, approval);
      cardsRef.current.setState({ index: currentIndex + 1 });
    };

    return (
      <form id="review-form" onSubmit={onSubmit}>
        <p>Swipe right to approve the sentence. Swipe left to reject it.</p>
        <p>You have reviewed {reviewedSentencesCount} sentences. Do not forget to submit your review by clicking on the &quot;Finish Review&quot; button below!</p>

        <SubmitButton submitText="Finish&nbsp;Review"/>

        { message && ( <p>{message}</p> ) }

        <Cards onEnd={() => {
          if (page === lastPage) {
            onSubmit({preventDefault: () => {}});
          }
        }} className="main-root" ref={cardsRef}>
          { sentences.map((sentence, i) => (
            <Card
              key={offset + i}
              onSwipeLeft={() => reviewSentence(offset + i, false)}
              onSwipeRight={() => reviewSentence(offset + i, true)}
            >
              <div className="card-sentence-box">
                <p>{sentence.sentence || sentence}</p>
                <small className="card-source">{sentence.source ? `Source: ${sentence.source}` : ''}</small>
              </div>
            </Card>
          ))}
        </Cards>
        <section className="card-review-footer">
          <button className="standalone secondary big" onClick={(event) => onReviewButtonPress(event, false)}>Reject</button>
          <button className="standalone secondary big" onClick={skip}>Skip</button>
          <button className="standalone secondary big" onClick={(event) => onReviewButtonPress(event, true)}>Approve</button>
        </section>
      </form>
    );
  }

  return (
    <form id="review-form" onSubmit={onSubmit}>
      { message && ( <p>{message}</p> ) }

      { currentSentences.map((sentence, i) => (
        <section id={`sentence-${offset + i}`} key={offset + i} className="validator">
          <div className="sentence-box">
            <p>{sentence.sentence || sentence}</p>
            <small>{sentence.source ? `Source: ${sentence.source}` : ''}</small>
          </div>
          <div className="button-group">
            <button type="button"
                    className={`${sentences[offset + i].reviewApproval === true ? 'yes' : ''}`}
                    aria-pressed={sentences[offset + i].reviewApproval === true}
                    onClick={() => reviewSentence(offset + i, true)}
                    name={`validate-${offset + i}`}>
              👍
            </button>
            <button type="button"
                    className={`${sentences[offset + i].reviewApproval === false ? 'no' : ''}`}
                    aria-pressed={sentences[offset + i].reviewApproval === false}
                    onClick={() => reviewSentence(offset + i, false)}
                    name={`validate-${offset + i}`}>
              👎
            </button>
          </div>
        </section>
      )) }

      <section className="review-footer">
        <SubmitButton submitText="Finish&nbsp;Review"/>
        <Pager page={page} lastPage={lastPage} onPage={setPage} />
      </section>
    </form>
  );
}
