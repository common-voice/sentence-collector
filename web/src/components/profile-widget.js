import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProfileWidget() {
  const { authed, username } = useSelector((state) => state.login);

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
