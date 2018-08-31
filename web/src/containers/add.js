import { connect } from 'react-redux';

import Add from '../components/pages/add';
import { submitSentences } from '../actions';

function mapStateToProps(state) {
  return {
    languages: state.languages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitSentences:
      (language, sentences) => dispatch(submitSentences(language, sentences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
