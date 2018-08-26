import { connect } from 'react-redux';

import App from '../components/app';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
