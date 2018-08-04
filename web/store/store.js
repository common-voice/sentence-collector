import { createStore } from 'redux';
import { ACTION_PENDING, ACTION_LOGOUT, ACTION_LOGIN } from './actions';
import { LOGIN_STATUSES } from './actions';

const initialState = {
  auth: LOGIN_STATUSES.LOGGED_OUT,
  username: null,
};

function copyInto(oldObj, newObj) {
  return Object.assign({}, oldObj, newObj);
}

export function reducer(state, action) {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case ACTION_LOGOUT:
      return initialState;

    case ACTION_LOGIN:
      return  {
        auth: LOGIN_STATUSES.LOGGED_IN,
        username: action.username,
      };

    case ACTION_PENDING:
      return copyInto(state, {
        auth: LOGIN_STATUSES.PENDING,
      });

    default:
      return state;
  }
}

export function getNewStore() {
  const store = createStore(reducer);
  return store;
}
