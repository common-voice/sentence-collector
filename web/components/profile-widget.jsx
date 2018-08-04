import React from 'react';

const ProfileWidget = (props) => (
  <div>
    <button>{ props.authed ? 'Logout' : 'Login' }</button>
  </div>
);

export default ProfileWidget;
