import DB from '../../shared/db';
import { getDatabaseUrl } from './config';

let instance;

class WebDB extends DB {
  constructor(username, password) {
    super(getDatabaseUrl(), username, password);
  }
}

export function getDBInstance(username, password) {
  // If we did not get username or password, and we do
  // not yet have an instance yet, we should not cache it
  // This for example happens on the main page without being
  // logged in.
  if (!instance && (!username || !password)) {
    return new WebDB();
  }

  // Initialize instance to be reused
  if (!instance && username && password) {
    instance = new WebDB(username, password);
  }

  return instance;
}

export function removeInstance() {
  instance = null;
}
