import React from 'react';
import { connect } from 'react-redux';

import ReviewLink from './review-link';
import SpinnerButton from './spinner-button';

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onReview = this.props.onReview.bind(this);
  }

  onSubmit(evt) {
    this.setState({
      pendingSentences: true,
    });

    this.props.onSubmit(evt);
  }

  render() {
    const {
      submitted,
      invalidated,
      validated,
      unreviewed,
      isUploadingSentences,
    } = this.props;

    const readyCount = submitted.length - invalidated.length;

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Confirm New Sentences</h2>
        <p>
          {`${submitted.length} sentences found.`}
        </p>

        {invalidated.length > 0 && (
          <p style={{color: 'red'}}>
            {`${invalidated.length} rejected by you`}
          </p>
        )}

        {validated.length + invalidated.length > 0 && (
          <p>
            {`-- ${validated.length + invalidated.length}`} {}
            sentences are already reviewed. Great job!
          </p>
        )}

        <p><strong>{`${readyCount} sentences ready for submission!`}</strong></p>

        {unreviewed.length > 0 && (
          <p>
            {`-- ${unreviewed.length} of these sentences are unreviewed. If you want, you can also review your sentences now before submitting them.`}&nbsp;
            <ReviewLink onReview={this.onReview}
                        sentences={unreviewed} />
          </p>
        )}

        <section id="confirm-buttons">
          { isUploadingSentences ?
            <SpinnerButton></SpinnerButton> :
            <button type="submit" disabled={readyCount === 0}>Confirm</button>
          }

          { isUploadingSentences && (
            <div>
              <p className="loadingText">
                Sentences are being uploaded. This can take several minutes depending on the number of sentences added.
                Please do not close this website.
              </p>
            </div>
          )}
        </section>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUploadingSentences: state.sentences.isUploadingSentences,
  };
}

export default connect(mapStateToProps)(ConfirmForm);
