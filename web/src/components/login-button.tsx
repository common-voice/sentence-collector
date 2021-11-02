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
            <Localized id="sc-login-signup-button" />
          </button>
        </a>
      )}
      {authed && (
        <a href="/sentence-collector/logout">
          <button>
            <Localized id="sc-logout-button" />
          </button>
        </a>
      )}
    </div>
  );
}
