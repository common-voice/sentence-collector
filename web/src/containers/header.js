import { connect } from 'react-redux';

import Header from '../components/header';

function mapStateToProps(state) {
  return {
    authed: state.authed,
  };
}

export default connect(mapStateToProps)(Header);
