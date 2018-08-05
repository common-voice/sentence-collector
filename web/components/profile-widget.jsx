import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout, isLoggedIn } from '../store/actions';

class ProfileWidget extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.dispatch(logout());
  }

  render() {
    if (!isLoggedIn(this.props.auth)) {
      return '';
    }

    return <div className="profile-widget">
      <h3><Link to="/profile">{this.props.username}</Link></h3>
      <button className="inverse" onClick={this.onLogout}>Logout</button>
    </div>;
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    username: state.username,
  };
})(ProfileWidget);

