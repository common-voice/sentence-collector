import {
  ACTION_PENDING,
  ACTION_LOGOUT,
  ACTION_LOGIN,
  LOGIN_STATUSES
} from '../actions';

const INITIAL_STATE = {
  auth: LOGIN_STATUSES.LOGGED_OUT,
  username: null,
};

function copyInto(oldObj, newObj) {
  return Object.assign({}, oldObj, newObj);
}

export default function reducer(state = INITIAL_STATE, action) {
  if (!state) {
    state = INITIAL_STATE;
  }

  console.log('action', action.type);

  switch(action.type) {
    case ACTION_LOGOUT:
      return copyInto(state, {
        auth: LOGIN_STATUSES.LOGGED_OUT,
        username: null,
      });

    case ACTION_LOGIN:
      return  copyInto(state, {
        auth: LOGIN_STATUSES.LOGGED_IN,
        username: action.username,
      });

    case ACTION_PENDING:
      return copyInto(state, {
        auth: LOGIN_STATUSES.PENDING,
      });

    default:
      return state;
  }
}

