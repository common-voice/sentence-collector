import * as login from '../actions/login';
import loginReducer from './login';

const combineState = (fields: Record<string, unknown>) => {
  const initialState = loginReducer(undefined, {
    type: 'inexistant',
  });

  return {
    ...initialState,
    ...fields,
  };
};

test('should use initial state', async () => {
  const newState = loginReducer(undefined, {
    type: 'inexistant',
  });

  expect(newState).toEqual({
    authed: false,
    username: '',
  });
});

test('should reduce login success', async () => {
  const newState = loginReducer(combineState({}), {
    type: login.ACTION_LOGIN_SUCCESS,
  });

  expect(newState.authed).toEqual(true);
});

test('should reduce logout success', async () => {
  const newState = loginReducer(combineState({}), {
    type: login.ACTION_LOGOUT,
  });

  expect(newState.authed).toEqual(false);
  expect(newState.username).toEqual('');
});

test('should reduce user info', async () => {
  const username = 'testUser';
  const newState = loginReducer(combineState({}), {
    type: login.ACTION_USER_INFO_RECEIVED,
    username,
  });

  expect(newState.authed).toEqual(true);
  expect(newState.username).toEqual(username);
});
