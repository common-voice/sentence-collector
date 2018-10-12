import { connect } from 'react-redux';

import Home from '../components/pages/home';

function mapStateToProps(state) {
  return {
    languages: state.languages,
    authed: state.authed,
    username: state.username,
    password: state.password,
  };
}

export default connect(mapStateToProps)(Home);
