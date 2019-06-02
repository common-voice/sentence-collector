import { connect } from 'react-redux';

import { logout } from '../actions';
import ProfileWidget from '../components/profile-widget';

function mapStateToProps(state) {
  return {
    authed: state.app.authed,
    username: state.app.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWidget);
