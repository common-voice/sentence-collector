import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

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
      Welcome {this.props.username}!
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

