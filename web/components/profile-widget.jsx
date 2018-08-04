import React from 'react';
import { connect } from 'react-redux';

import { logout, isLoggedIn } from '../store/actions';

class ProfileWidget extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    if (isLoggedIn(this.props.auth)) {
      this.props.dispatch(logout());
    } else {
      // TODO: redirect to login page?
    }
  }

  render() {
    return <div>
      <button className="inverse" onClick={this.onToggle}>
        { isLoggedIn(this.props.auth) ? 'Logout' : 'Login' }
      </button>
    </div>;
  }
}

export default connect(state => {
  return {
    auth: state.auth
  };
})(ProfileWidget);

