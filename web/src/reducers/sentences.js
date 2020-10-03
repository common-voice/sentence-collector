import {
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_DONE,
  ACTION_SUBMIT_SENTENCES_FAILURE,
  ACTION_LOAD_REJECTED_SENTENCES,
  ACTION_GOT_REJECTED_SENTENCES,
  ACTION_REJECTED_SENTENCES_FAILURE,
  ACTION_LOAD_SENTENCES,
  ACTION_GOT_SENTENCES,
  ACTION_REVIEWED_SENTENCES,
  ACTION_REVIEW_SENTENCES_FAILURE,
} from '../actions/sentences';

export const INITIAL_STATE = {
  sentenceSubmissionFailures: [],
  isUploadingSentences: false,
  rejectedSentencesLoading: false,
  rejectedSentences: [],
  rejectedSentencesError: null,
  sentences: [],
  sentencesLoading: false,
  reviewMessage: null,
};

export default function(state = INITIAL_STATE, action) {
  const errors = action.errors || [];

  switch(action.type) {
    case ACTION_SUBMIT_SENTENCES_REQUEST:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: [],
        isUploadingSentences: true,
      });

    case ACTION_SUBMIT_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: errors.reduce((groupedFiltered, filterResult) => {
          if (!groupedFiltered[filterResult.error]) {
            groupedFiltered[filterResult.error] = [];
          }

          groupedFiltered[filterResult.error].push(filterResult.sentence);
          return groupedFiltered;
        }, {}),
      });

    case ACTION_SUBMIT_SENTENCES_DONE:
      return Object.assign({}, state, {
        isUploadingSentences: false,
      });

    case ACTION_LOAD_REJECTED_SENTENCES:
      return Object.assign({}, state, {
        rejectedSentencesLoading: true,
        rejectedSentencesError: null,
      });

    case ACTION_GOT_REJECTED_SENTENCES:
      return Object.assign({}, state, {
        rejectedSentencesLoading: false,
        rejectedSentences: action.sentences,
      });

    case ACTION_REJECTED_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        rejectedSentencesLoading: false,
        rejectedSentences: [],
        rejectedSentencesError: action.errorMessage,
      });

    case ACTION_LOAD_SENTENCES:
      return Object.assign({}, state, {
        sentencesLoading: true,
      });

    case ACTION_GOT_SENTENCES:
      return Object.assign({}, state, {
        sentencesLoading: false,
        sentences: action.sentences,
      });

    case ACTION_REVIEWED_SENTENCES:
      return Object.assign({}, state, {
        reviewMessage: `${action.votes} sentences reviewed. Thank you!`,
      });

    case ACTION_REVIEW_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        reviewMessage: action.errorMessage,
      });

    default:
      return state;
  }
}
