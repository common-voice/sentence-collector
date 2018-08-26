import { connect } from 'react-redux';

import Login from '../components/pages/login';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    username: state.username,
  };
}

export default connect(mapStateToProps)(Login);
