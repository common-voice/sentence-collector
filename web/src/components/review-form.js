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

  const cardsRef = React.createRef();
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
  };

  if (!Array.isArray(sentences) || sentences.length < 1) {
    return <h2>nothing to review</h2>;
  }

  const currentSentences = sentences.slice(offset, offset + PAGE_SIZE);

  if (useSwipeReview) {
    let message = (<p>You have not reviewed any sentences yet!</p>);
    if (page !== 0) {
      message = (<p>You have successfully reviewed your {page * PAGE_SIZE}th sentence!</p>);
    }

    return (
      <form id="review-form" onSubmit={onSubmit}>
        <p>Swipe right to approve sentence, swipe left to reject it.</p>

        {message}

        <Cards onEnd={() => {
          if (page === lastPage) {
            onSubmit({preventDefault: () => {}});
          } else {
            setPage(page + 1);
            cardsRef.current.setState({index: -1}); //cardsRef.state.index modified due to Cards' inner card removal handling.
          }
        }} className="main-root" ref={cardsRef}>
          { currentSentences.map((sentence, i) => (
            <Card
              key={offset + i}
              onSwipeLeft={() => reviewSentence(offset + i, false)}
              onSwipeRight={() => reviewSentence(offset + i, true)}
            >
              <div className="card-sentence-box">
                <p>{sentence.sentence || sentence}</p>
                <small>{sentence.source ? `Source: ${sentence.source}` : ''}</small>
              </div>
            </Card>
          ))}
        </Cards>
        <section className="review-footer">
          <SubmitButton submitText="Finish&nbsp;Review"/>
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
                    className={`secondary ${sentences[offset + i].reviewApproval === true ? 'yes' : ''}`}
                    aria-pressed={sentences[offset + i].reviewApproval === true}
                    onClick={() => reviewSentence(offset + i, true)}
                    name={`validate-${offset + i}`}>
              👍
            </button>
            <button type="button"
                    className={`secondary ${sentences[offset + i].reviewApproval === false ? 'no' : ''}`}
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
