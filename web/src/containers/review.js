import { connect } from 'react-redux';

import Review from '../components/pages/review';

function mapStateToProps(state) {
  return {
    languages: state.languages,
    username: state.username,
    password: state.password,
  };
}

export default connect(mapStateToProps)(Review);
