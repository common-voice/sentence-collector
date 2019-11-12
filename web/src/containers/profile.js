import { connect } from 'react-redux';

import { addLanguage, removeLanguage, setSetting } from '../actions';
import Profile from '../components/pages/profile';

function mapStateToProps(state) {
  return {
    username: state.app.username,
    password: state.app.password,
    languages: state.app.languages,
    pending: state.app.pendingLanguages,
    settings: state.app.settings,
    settingsChangedFailureMessage: state.app.settingsChangedFailureMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: (language) => dispatch(addLanguage(language)),
    removeLanguage: (language) => dispatch(removeLanguage(language)),
    setSetting: (key, value) => dispatch(setSetting(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
