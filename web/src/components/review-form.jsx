import React from 'react';

import '../../css/review-form.css';

const PAGE_SIZE = 3;
const DEFAULT_STATE = {
  page: 0,
}

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.onSubmit = this.onSubmit.bind(this);
    this.setPage = this.setPage.bind(this);
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
  onSubmit(evt) {
    evt.preventDefault();
    let validated = [];
    let invalidated = [];

    // Extract sentence that have been voted on.
    const unreviewed = this.props.sentences.filter((sen, i) => {
      const no = document.querySelector(`#no-${i}`);
      if (no && no.checked) {
        invalidated.push(sen);
        return false;
      }

      const yes = document.querySelector(`#yes-${i}`);
      if (yes && yes.checked) {
        validated.push(sen);
        return false;
      }

      return true;
    });

    this.props.onReviewed({
      validated,
      invalidated,
      unreviewed,
    });
  }

  setPage(page) {
    this.setState({
      page,
    });
  }

  render() {
    if (!this.props.sentences && this.props.sentences.length < 1) {
      return <h2>nothing to review</h2>;
    }

    const offset = this.getOffset();
    const curSentences = this.props.sentences.slice(offset, offset + PAGE_SIZE);

    return (
      <form id="add-form" onSubmit={this.onSubmit}>
        <h2>Review Sentences</h2>
        <p>Page {this.state.page + 1} of {this.getTotalPages()}.</p>
        <Pager page={this.state.page} lastPage={this.getLastPage()}
               onPage={this.setPage} />
        { this.props.message && ( <p>{ this.props.message }</p> ) }
        { curSentences.map((sentence, i) => (
          <section id={`sentence-${i}`} key={i} className="validator">
            <div className="sentence-box">
              {sentence.sentence || sentence}
            </div>
            <input id={`yes-${i}`} type="radio" name={`validate-${i}`} />
            <label htmlFor={`yes-${i}`}>Yes</label>
            <input type="radio" id={`no-${i}`} name={`validate-${i}`} />
            <label htmlFor={`no-${i}`}>No</label>
            <div className="button-group">
              <input id={`fix-${i}`} type="radio" name={`validate-${i}`} />
              <label htmlFor={`fix-${i}`}>Fix</label>
              <input type="radio" id={`skip-${i}`} name={`validate-${i}`} />
              <label htmlFor={`skip-${i}`}>Skip</label>
            </div>
          </section>
        )) }
        <Pager page={this.state.page} lastPage={this.getLastPage()}
               onPage={this.setPage} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const Pager = (props) => (
  <section>{
    [
      [0, '1'],
      [props.page - 1, '<'],
      [props.page, props.page + 1],
      [props.page + 1, '>'],
      [props.lastPage, props.lastPage + 1],
    ].map(([ page, text ]) => (
      <span>{
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
