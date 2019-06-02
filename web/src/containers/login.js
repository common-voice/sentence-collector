import { connect } from 'react-redux';

import Login from '../components/pages/login';
import {
  login,
  logout,
  checkLoginInput,
} from '../actions';

function mapStateToProps(state) {
  return {
    authed: state.app.authed,
    username: state.app.username,
    errorMessage: state.app.errorMessage,
    loginDisabled: state.app.loginDisabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: async (username, password) => {
      return dispatch(login(username, password));
    },
    logout: () => dispatch(logout()),
    checkLoginInput: (username, password) => dispatch(checkLoginInput(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
