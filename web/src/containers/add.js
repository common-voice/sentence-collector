import { connect } from 'react-redux';

import Add from '../components/pages/add';

import {
  submitSentences,
  resetFullState,
} from '../actions';

import {
  parseSentences,
} from '../actions/parsing';

function mapStateToProps(state) {
  return {
    languages: state.languages,
    username: state.username,
    password: state.password,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitSentences:
      (language, sentences, source) => dispatch(submitSentences(language, sentences, source)),
    parseSentences: (language, text) => dispatch(parseSentences(language, text)),
    resetFullState: () => dispatch(resetFullState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
