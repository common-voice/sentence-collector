import { connect } from 'react-redux';

import Review from '../components/pages/review';

function mapStateToProps(state) {
  return {
    languages: state.app.languages,
    username: state.app.username,
    password: state.app.password,
    useSwipeReview: state.app.settings && state.app.settings.useSwipeReview,
  };
}

export default connect(mapStateToProps)(Review);
