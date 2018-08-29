import { connect } from 'react-redux';

import Add from '../components/pages/add';

function mapStateToProps(state) {
  return {
    languages: state.languages,
  };
}

export default connect(mapStateToProps)(Add);
