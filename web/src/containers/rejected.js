import { connect } from 'react-redux';

import Rejected from '../components/pages/rejected';

function mapStateToProps(state) {
  return {
    username: state.username,
    password: state.password,
    languages: state.languages,
  };
}

export default connect(mapStateToProps)(Rejected);
