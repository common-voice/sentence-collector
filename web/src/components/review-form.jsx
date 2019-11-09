import React from 'react';

import '../../css/review-form.css';
import SpinnerButton from './spinner-button';

import Cards from './swipecard/Cards';
import Card from "./swipecard/CardSwitcher";

const PAGE_SIZE = 5;
const DEFAULT_STATE = {
  page: 0,
};
let mobileUI = false;

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.onSubmit = this.onSubmit.bind(this);
    this.setPage = this.setPage.bind(this);
    this.cardsRef = React.createRef();

    this.state.sentences = this.props.sentences.map((sentence) => {
      return {
        sentence,
      };
    });
  }

  getTotalPages() {
    return Math.ceil(this.props.sentences.length / PAGE_SIZE);
  }

  getLastPage() {
    return this.getTotalPages() - 1;
  }

  getOffset() {
    return this.state.page * PAGE_SIZE;
  }

  async onSubmit(evt) {
    evt.preventDefault();
    let validated = [];
    let invalidated = [];

    this.setState({
      pendingSentences: true,
    });

    // Extract sentence that have been voted on.
    const unreviewed = this.state.sentences.filter((sentenceInfo) => {
      if (sentenceInfo.reviewApproval) {
        validated.push(sentenceInfo.sentence);
        return false;
      }

      if (sentenceInfo.reviewApproval === false) {
        invalidated.push(sentenceInfo.sentence);
        return false;
      }

      return true;
    }).map((sentenceInfo) => sentenceInfo.sentence);

    await this.props.onReviewed({
      validated,
      invalidated,
      unreviewed,
    });

    this.setState({
      pendingSentences: false,
    });
  }

  setPage(page) {
    this.setState({
      page,
    });
  }

  reviewSentence(index, approval) {
    const sentences = this.state.sentences;

    if (sentences[index].reviewApproval === approval) {
      // already set before, deselecting now
      sentences[index].reviewApproval = undefined;
    } else {
      sentences[index].reviewApproval = approval;
    }

    this.setState({ sentences });
  }

  render() {
    if (!this.props.sentences && this.props.sentences.length < 1) {
      return <h2>nothing to review</h2>;
    }

    const offset = this.getOffset();
    const curSentences = this.props.sentences.slice(offset, offset + PAGE_SIZE);

    if (mobileUI) {
      let message = (<p>You have not reviewed any sentences yet!</p>);
      if (this.state.page !== 0) {
        message = (<p>You have successfully reviewed your {this.state.page * PAGE_SIZE}th sentence!</p>)
      }

      return (
        <form id="review-form" onSubmit={this.onSubmit}>
          <p>Swipe right to approve sentence, swipe left to reject it.</p>
          {message}
          <Cards onEnd={() => {
            if (this.state.page === this.getLastPage()) {
              this.onSubmit({preventDefault: ()=>{}});
            } else {
              this.setPage(this.state.page + 1);
              this.cardsRef.current.setState({index: -1});//cardsRef.state.index modified due to Cards' inner card removal handling.
            }
          }} className="master-root" ref={this.cardsRef}>
            {curSentences.map((sentence, i) => (
              <Card
                key={offset + i}
                onSwipeLeft={() => this.reviewSentence(offset + i, false)}
                onSwipeRight={() => this.reviewSentence(offset + i, true)}
              >
                <div className="card-sentence-box">
                  {sentence.sentence || sentence}
                </div>
              </Card>
            ))}
          </Cards>
          <section className="review-footer">
          <ConfirmButtons pendingSentences={this.state.pendingSentences}/>
          </section>
        </form>
      );
    }

    return (
      <form id="review-form" onSubmit={this.onSubmit}>
        { this.props.message && ( <p>{ this.props.message }</p> ) }

        { curSentences.map((sentence, i) => (
          <section id={`sentence-${offset + i}`} key={offset + i} className="validator">
            <div className="sentence-box">
              { sentence.sentence || sentence }
            </div>
            <div className="button-group">
              <button type="button"
                      className={`secondary ${this.state.sentences[offset + i].reviewApproval === true ? 'yes' : ''}`}
                      aria-pressed={this.state.sentences[offset + i].reviewApproval === true}
                      onClick={() => this.reviewSentence(offset + i, true)}
                      name={`validate-${offset + i}`}>
                👍
              </button>
              <button type="button"
                      className={`secondary ${this.state.sentences[offset + i].reviewApproval === false ? 'no' : ''}`}
                      aria-pressed={this.state.sentences[offset + i].reviewApproval === false}
                      onClick={() => this.reviewSentence(offset + i, false)}
                      name={`validate-${offset + i}`}>
                👎
              </button>
            </div>
          </section>
        )) }

        <section className="review-footer">
          <ConfirmButtons pendingSentences={this.state.pendingSentences}/>
          <Pager page={this.state.page} lastPage={this.getLastPage()}
                 onPage={this.setPage} />
        </section>
      </form>
    );
  }
}

const Pager = (props) => (
  <section className="pager-container">{
    [
      [0, '1'],
      [props.page - 1, '<'],
      [props.page, props.page + 1],
      [props.page + 1, '>'],
      [props.lastPage, props.lastPage + 1],
    ].map(([ page, text ], index) => (
      <span key={`idx${index+1}`}>{
        (page >= 0 && page <= props.lastPage) ? (
          <button className={ props.page === page ? 'active pager' : 'pager' }
            onClick={evt => {
              evt.preventDefault();
              props.onPage && props.onPage(page);
            }} key={`page-link-${page}`}>
          {text}
          </button>
        ) : (
          <button key={`page-link-${page}`} className="active pager">{text}</button>
        )
      }</span>
    ))
  }</section>
);

const ConfirmButtons = (props) => (
  <section id="confirm-buttons" className="divCenter">
    { props.pendingSentences ?
      <SpinnerButton></SpinnerButton> :
      <button type="submit">Finish Review</button>
    }

    { props.pendingSentences && (
      <div>
        <p className="loadingText">Reviews are being uploaded. This can take several minutes depending on the number of sentences added.
          Please don&apos;t close this website.</p>
      </div>
    )}
  </section>
);
