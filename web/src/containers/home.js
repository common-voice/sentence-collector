import { connect } from 'react-redux';

import Home from '../components/pages/home';

function mapStateToProps(state) {
  return {
    languages: state.languages,
    authed: state.authed,
    username: state.username,
  };
}

export default connect(mapStateToProps)(Home);
