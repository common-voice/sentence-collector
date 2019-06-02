import { connect } from 'react-redux';

import App from '../components/app';

function mapStateToProps(state) {
  return {
    authed: state.app.authed,
  };
}

export default connect(mapStateToProps)(App);
