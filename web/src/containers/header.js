import { connect } from 'react-redux';

import Header from '../components/header';

function mapStateToProps(state) {
  return {
    // force a re-render of header active links on location change.
    location: state.router.location,
    authed: state.authed,
  };
}

export default connect(mapStateToProps)(Header);
