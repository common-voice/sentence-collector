import { connect } from 'react-redux';

import Review from '../components/pages/review';

function mapStateToProps(state) {
  return {
    languages: state.app.languages,
    username: state.app.username,
    password: state.app.password,
  };
}

export default connect(mapStateToProps)(Review);
