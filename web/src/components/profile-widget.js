import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileWidget({ authed, username }) {
  if (!authed) {
    return '';
  }

  return (
    <div className="profile-widget">
      <p className="small"><Link to="/profile">{username}</Link></p>
      <a href="/sentence-collector/logout">Logout</a>
    </div>
  );
}
