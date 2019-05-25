import { connect } from 'react-redux';

import Home from '../components/pages/home';

function mapStateToProps(state) {
  return {
    languages: state.app.languages,
    authed: state.app.authed,
    username: state.app.username,
    password: state.app.password,
  };
}

export default connect(mapStateToProps)(Home);
