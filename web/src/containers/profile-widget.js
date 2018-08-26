import { connect } from 'react-redux';

import ProfileWidget from '../components/profile-widget';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    username: state.username,
  };
}

export default connect(mapStateToProps)(ProfileWidget);
