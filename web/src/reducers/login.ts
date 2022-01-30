import type { AnyAction } from 'redux';

import { ACTION_LOGOUT, ACTION_LOGIN_SUCCESS, ACTION_USER_INFO_RECEIVED } from '../actions/login';

export type LoginState = {
  authed: boolean;
  username: string;
};

export const INITIAL_STATE: LoginState = {
  authed: false,
  username: '',
};

export default function (state = INITIAL_STATE, action: AnyAction): LoginState {
  switch (action.type) {
    case ACTION_LOGOUT:
      return Object.assign({}, state, INITIAL_STATE);

    case ACTION_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authed: true,
      });

    case ACTION_USER_INFO_RECEIVED:
      return Object.assign({}, state, {
        authed: true,
        username: action.username,
      });

    default:
      return state;
  }
}
