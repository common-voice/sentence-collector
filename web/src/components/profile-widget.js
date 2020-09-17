import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileWidget(props) {
  if (!props.authed) {
    return '';
  }

  return (
    <div className="profile-widget">
      <p className="small"><Link to="/profile">{props.username}</Link></p>
      <a href="/sentence-collector/logout">Logout</a>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authed: state.login.authed,
    username: state.login.username,
  };
}

export default connect(mapStateToProps)(ProfileWidget);
