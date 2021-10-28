import React from 'react';
import { Localized } from '@fluent/react';

type Props = {
  authed: boolean;
};

export default function LoginButton({ authed }: Props) {
  return (
    <div className="login-widget">
      {!authed && (
        <a href="/sentence-collector/login">
          <button>
            <Localized id="sc-login-signup-button">
              Login / Signup
            </Localized>
          </button>
        </a>
      )}
      {authed && (
        <a href="/sentence-collector/logout">
          <button>
            <Localized id="sc-logout-button">
              Logout
            </Localized>
          </button>
        </a>
      )}
    </div>
  );
}
