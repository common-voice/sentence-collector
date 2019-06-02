import { connect } from 'react-redux';

import Add from '../components/pages/add';

import {
  submitSentences,
} from '../actions';

import {
  parseSentences,
} from '../actions/parsing';

function mapStateToProps(state) {
  return {
    languages: state.app.languages,
    username: state.app.username,
    password: state.app.password,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitSentences:
      (language, sentences, source) => dispatch(submitSentences(language, sentences, source)),
    parseSentences: (language, text) => dispatch(parseSentences(language, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
