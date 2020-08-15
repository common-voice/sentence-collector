import {
  ACTION_LOGOUT,
  ACTION_LOGIN_SUCCESS,
} from '../actions/login';

export const INITIAL_STATE = {
  authed: false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
      return Object.assign({}, state, INITIAL_STATE);

    case ACTION_LOGIN_SUCCESS:
      return  Object.assign({}, state, {
        authed: true,
      });

    default:
      return state;
  }
}
