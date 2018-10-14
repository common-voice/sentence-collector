import React from 'react';

import '../../css/review-form.css';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    if (!this.props.sentences && this.props.sentences.length < 1) {
      return <h2>nothing to review</h2>;
    }

    return (
      <form id="add-form" onSubmit={this.onSubmit}>
        <h2>Review Sentences</h2>
        { this.props.message && ( <p>{ this.props.message }</p> ) }
        { this.props.sentences.map((sentence, i) => (
          <section id={`sentence-${i}`} key={i} className="validator">
            <div className="sentence-box">
              {sentence.sentence}
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
        <button type="submit">Submit</button>
      </form>
    );
  }
}
