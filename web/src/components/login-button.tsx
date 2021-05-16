import React from 'react';

export default function LoginButton({ authed }) {
  return (
    <div className="login-widget">
      { !authed && (<a href="/sentence-collector/login"><button>Login / Signup</button></a>) }
      { authed && (<a href="/sentence-collector/logout"><button>Logout</button></a>) }
    </div>
  );
}
