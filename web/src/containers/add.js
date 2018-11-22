import { connect } from 'react-redux';

import Add from '../components/pages/add';
import { submitSentences } from '../actions';

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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
