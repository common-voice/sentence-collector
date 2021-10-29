// LOCALIZATION VERSION - FIXME
import type { AnyAction } from 'redux';
// import { useLocalization } from '@fluent/react';

import {
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_DONE,
  ACTION_SUBMIT_SENTENCES_ERRORS,
  ACTION_LOAD_SENTENCES,
  ACTION_GOT_SENTENCES,
  ACTION_REVIEWED_SENTENCES,
  ACTION_REVIEW_SENTENCES_FAILURE,
  ACTION_REVIEW_RESET_MESSAGE,
  ACTION_REVIEW_SAVE_SKIPPED_SENTENCES,
  ACTION_REVIEW_RESET_SKIPPED_SENTENCES,
} from '../actions/sentences';

import type { BackendSentenceFailure, SentenceRecord, SubmissionFailures } from '../types';

export type SentencesState = {
  sentenceSubmissionFailures: SubmissionFailures;
  isUploadingSentences: boolean;
  sentences: SentenceRecord[];
  sentencesLoading: boolean;
  reviewMessage: string;
  skippedSentences: number[];
};

export const INITIAL_STATE: SentencesState = {
  sentenceSubmissionFailures: {},
  isUploadingSentences: false,
  sentences: [],
  sentencesLoading: false,
  reviewMessage: '',
  skippedSentences: [],
};

export default function (state = INITIAL_STATE, action: AnyAction): SentencesState {
  const errors = action.errors || [];

  // FIXME : Uncaught Error: useLocalization was used without wrapping it in a <LocalizationProvider />.
  // const { l10n } = useLocalization();

  switch (action.type) {
    case ACTION_SUBMIT_SENTENCES_REQUEST:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: {},
        isUploadingSentences: true,
      });

    case ACTION_SUBMIT_SENTENCES_ERRORS:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: errors.reduce(
          (groupedFiltered: SubmissionFailures, filterResult: BackendSentenceFailure) => {
            if (!groupedFiltered[filterResult.error]) {
              groupedFiltered[filterResult.error] = [];
            }

            groupedFiltered[filterResult.error].push(filterResult.sentence);
            return groupedFiltered;
          },
          {}
        ),
      });

    case ACTION_SUBMIT_SENTENCES_DONE:
      return Object.assign({}, state, {
        isUploadingSentences: false,
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
      {
        /* FIXME : Uncaught Error: useLocalization was used without wrapping it in a <LocalizationProvider />. */
      }
      return Object.assign({}, state, {
        // reviewMessage: l10n.getString('sc-red-sentences-review', { noOfSentences: action.votes }),
        reviewMessage: `!!! ${action.votes} sentences reviewed. Thank you!`,
      });

    case ACTION_REVIEW_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        reviewMessage: action.errorMessage,
      });

    case ACTION_REVIEW_SAVE_SKIPPED_SENTENCES:
      return Object.assign({}, state, {
        skippedSentences: state.skippedSentences
          ? [...state.skippedSentences, ...action.sentenceIds]
          : [...action.sentenceIds],
      });

    case ACTION_REVIEW_RESET_SKIPPED_SENTENCES:
      return Object.assign({}, state, {
        skippedSentences: [],
      });

    case ACTION_REVIEW_RESET_MESSAGE:
      return Object.assign({}, state, {
        reviewMessage: '',
      });

    default:
      return state;
  }
}
