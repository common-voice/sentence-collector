import btoa from 'btoa';
import KintoClient from 'kinto-http';

import User from './db/collections/user';

export const BUCKET_NAME = 'App';

function getPermissionsObject(permissions) {
  let permObject = {};

  if (!Array.isArray(permissions)) {
    permissions = [permissions];
  }
  permissions.forEach(perm => permObject[perm.type] = perm.principals);
  return { permissions: permObject };
}

export const PRINCIPAL_ALL = 'system.Everyone';
export const PRINCIPAL_AUTHED = 'system.Authenticated';

export const TYPE_WRITE = 'write';
export const TYPE_READ = 'read';
export const TYPE_CREATE_RECORD = 'record:create';

export default class DB {
  constructor(remote, username, password) {
    this.username = username;
    this.password = password;

    const defaultOptions = {
      remote,
    };

    if (username && password) {
      defaultOptions['headers'] = {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      };
    }

    this.server = new KintoClient(remote, defaultOptions);
    this.user = new User(this.server, username);
  }

  async initDB() {

    await this.server.createBucket(BUCKET_NAME, getPermissionsObject([{
      type: TYPE_READ,
      principals: [],
    }, {
      type: TYPE_WRITE,
      principals: [],
    }]));
    const bucket = await this.getBucket();

    // Create collections.
    await bucket.createCollection(User.NAME,  getPermissionsObject([{
      type: TYPE_CREATE_RECORD,
      principals: [ PRINCIPAL_AUTHED ],
    }, {
      type: TYPE_READ,
      principals: [],
    }]));
  }

  async getBucket() {
    return this.server.bucket(BUCKET_NAME);
  }

  async auth() {
    return this.user.tryAuth();
  }

  async setSetting(key, value) {
    return this.user.setSetting(key, value);
  }

  async addLanguage(language) {
    return this.user.addLanguage(language);
  }

  async removeLanguage(language) {
    return this.user.removeLanguage(language);
  }
}

DB.BUCKET_NAME = BUCKET_NAME;
