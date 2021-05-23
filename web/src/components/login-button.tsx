import React from 'react';

type Props = {
  authed: boolean
}

export default function LoginButton({ authed }: Props) {
  return (
    <div className="login-widget">
      { !authed && (<a href="/sentence-collector/login"><button>Login / Signup</button></a>) }
      { authed && (<a href="/sentence-collector/logout"><button>Logout</button></a>) }
    </div>
  );
}
