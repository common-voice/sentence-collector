import {
  ACTION_LOGOUT,
  ACTION_LOGIN_SUCCESS,
  ACTION_USER_INFO_RECEIVED,
  ACTION_USER_MIGRATION_START,
  ACTION_USER_MIGRATION_SUCCESS,
  ACTION_USER_MIGRATION_FAILURE,
} from '../actions/login';

export const INITIAL_STATE = {
  authed: false,
  username: '',
  migrating: false,
  migrationError: undefined,
  migrationDone: false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
      return Object.assign({}, state, INITIAL_STATE);

    case ACTION_LOGIN_SUCCESS:
      return  Object.assign({}, state, {
        authed: true,
      });

    case ACTION_USER_INFO_RECEIVED:
      return  Object.assign({}, state, {
        authed: true,
        username: action.username,
      });

    case ACTION_USER_MIGRATION_START:
      return  Object.assign({}, state, {
        migrating: true,
        migrationError: undefined,
      });

    case ACTION_USER_MIGRATION_SUCCESS:
      return  Object.assign({}, state, {
        migrating: false,
        migrationDone: true,
        migrationError: undefined,
      });

    case ACTION_USER_MIGRATION_FAILURE:
      return  Object.assign({}, state, {
        migrating: false,
        migrationDone: false,
        migrationError: action.errorMessage,
      });

    default:
      return state;
  }
}
