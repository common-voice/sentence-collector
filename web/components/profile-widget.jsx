import React from 'react';
import { connect } from 'react-redux';

import { ACTION_LOGIN, ACTION_LOGOUT } from '../store';

class ProfileWidget extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    if (this.props.authed) {
      this.props.dispatch({ type: ACTION_LOGOUT });
    } else {
      // TODO: redirect to login page?
    }
  }

  render() {
    return <div>
      <button className="inverse" onClick={this.onToggle}>
        { this.props.authed ? 'Logout' : 'Login' }
      </button>
    </div>;
  }
}

export default connect(state => {
  return {
    authed: state.authed
  };
})(ProfileWidget);

