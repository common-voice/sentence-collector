import { connect } from 'react-redux';

import { addLanguage } from '../actions';
import Profile from '../components/pages/profile';

function mapStateToProps(state) {
  return {
    username: state.username,
    languages: state.languages,
    pendingLanguages: state.pendingLanguages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: (language) => dispatch(addLanguage(language)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
