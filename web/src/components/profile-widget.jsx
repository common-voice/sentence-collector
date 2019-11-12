import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions';

class ProfileWidget extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logout();
  }

  render() {
    if (!this.props.authed) {
      return '';
    }

    return (
      <div className="profile-widget">
        <h3><Link to="/profile">{this.props.username}</Link></h3>
        <button className="inverse" onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authed: state.app.authed,
    username: state.app.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWidget);
