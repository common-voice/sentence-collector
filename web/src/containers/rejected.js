import { connect } from 'react-redux';

import Rejected from '../components/pages/rejected';

function mapStateToProps(state) {
  return {
    username: state.app.username,
    password: state.app.password,
    languages: state.app.languages,
  };
}

export default connect(mapStateToProps)(Rejected);
