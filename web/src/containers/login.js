import { connect } from 'react-redux';

import Login from '../components/pages/login';
import {
  login,
  logout,
  checkUsername,
} from '../actions';

function mapStateToProps(state) {
  return {
    pending: state.pendingAuth,
    authed: state.authed,
    username: state.username,
    errorMessage: state.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: async (username, password) => {
      return dispatch(login(username, password));
    },
    logout: () => dispatch(logout()),
    checkUsername: (username) => dispatch(checkUsername(username)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
