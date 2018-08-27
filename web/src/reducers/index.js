import {
  ACTION_LOGOUT,
  ACTION_LOGIN_REQUEST,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE
} from '../actions';

export const INITIAL_STATE = {
  authed: false,
  pendingAuth: false,
  username: null,
  password: null,
};

function copyInto(oldObj, newObj) {
  return Object.assign({}, oldObj, newObj);
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
    case ACTION_LOGIN_FAILURE:
      return INITIAL_STATE;

    case ACTION_LOGIN_SUCCESS:
      return  copyInto(state, {
        authed: true,
        pendingAuth: false,
        username: action.username,
        password: action.password,
      });

    case ACTION_LOGIN_REQUEST:
      return copyInto(state, {
        authed: false,
        pendingAuth: true,
      });

    default:
      return state;
  }
}

