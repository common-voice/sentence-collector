import { connect } from 'react-redux';

import CommonVoiceInfo from '../components/cv-info';

function mapStateToProps(state) {
  return {
    authed: state.app.authed,
    username: state.app.username,
    password: state.app.password,
  };
}

export default connect(mapStateToProps)(CommonVoiceInfo);
