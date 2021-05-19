import * as backend from '../backend';
import * as languages from './languages';
import * as settings from './settings';
import * as login from './login';

const userInfo = {
  email: 'foo@example.com',
  languages: ['en'],
  settings: {},
};
let dispatch: jest.Mock;


beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(backend, 'sendRequest');
  jest.spyOn(console, 'error');
  dispatch = jest.fn();
});

describe('afterLogin', () => {
  test('should dispatch success', async () => {
    await login.afterLogin()(dispatch);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: login.ACTION_LOGIN_SUCCESS,
    });
  });
});

describe('checkCurrentUser', () => {
  test('should get current user', async () => {
    (backend.sendRequest as jest.Mock).mockImplementation(() => userInfo);
    await login.checkCurrentUser()(dispatch);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual('users/whoami');
    expect(dispatch.mock.calls[0][0]).toEqual({
      username: userInfo.email,
      type: login.ACTION_USER_INFO_RECEIVED,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      languages: userInfo.languages,
      type: languages.ACTION_ADD_LANGUAGE_SUCCESS,
    });
    expect(dispatch.mock.calls[2][0]).toEqual({
      newSettings: userInfo.settings,
      type: settings.ACTION_SETTINGS_CHANGED,
    });
  });

  test('should not throw on error', async () => {
    const error = new Error('NOPE');
    (console.error as jest.Mock).mockImplementation(() => { /* ignore */ });
    (backend.sendRequest as jest.Mock).mockImplementation(() => { throw error; });
    expect(login.checkCurrentUser()(dispatch)).resolves.not.toThrow();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: login.ACTION_LOGOUT,
    });
  });
});

describe('logout', () => {
  test('should dispatch success', async () => {
    await login.logout()(dispatch);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: login.ACTION_LOGOUT,
    });
  });
});
