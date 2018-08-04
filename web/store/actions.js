export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_PENDING = 'WAIT';
export const ACTION_LOGIN = 'LOGIN';

export const LOGIN_STATUSES = {
  LOGGED_IN: 'LOGGED_IN',
  PENDING: 'PENDING',
  LOGGED_OUT: 'LOGGED_OUT',
};

export function login(username) {
  return {
    type: ACTION_LOGIN,
    username,
  };
}

export function setPending() {
  return {
    type: ACTION_PENDING,
  };
}


export function logout() {
  return {
    type: ACTION_LOGOUT,
  };
}

export function isLoggedIn(auth) {
  return auth === LOGIN_STATUSES.LOGGED_IN;
}

export function isPending(auth) {
  return auth === LOGIN_STATUSES.PENDING;
}
