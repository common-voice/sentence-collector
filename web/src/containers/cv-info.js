import { connect } from 'react-redux';

import CommonVoiceInfo from '../components/cv-info';

function mapStateToProps(state) {
  return {
    authed: state.authed,
    username: state.username,
    password: state.password,
  };
}

export default connect(mapStateToProps)(CommonVoiceInfo);
