import * as backend from '../backend';
import * as settings from './settings';

let dispatch;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(backend, 'sendRequest');
  dispatch = jest.fn();
});

describe('setSetting', () => {
  test('should set setting', async () => {
    const setting = { key: 'foo', value: 'bar' };
    backend.sendRequest.mockImplementation(() => {});
    await settings.setSetting(setting.key, setting.value)(dispatch);
    expect(backend.sendRequest.mock.calls[0][0]).toEqual('users/settings');
    expect(backend.sendRequest.mock.calls[0][1]).toEqual('POST');
    expect(backend.sendRequest.mock.calls[0][2]).toEqual(setting);
    expect(dispatch.mock.calls[0][0]).toEqual({
      newSettings: { foo: 'bar' },
      type: settings.ACTION_SETTINGS_CHANGED,
    });
  });

  test('should throw on error', async () => {
    const error = new Error('NOPE');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    backend.sendRequest.mockImplementation(() => { throw error; });
    expect(settings.setSetting()(dispatch)).rejects.toThrow(error);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: settings.ACTION_SETTINGS_CHANGED_FAILURE,
    });
  });
});
