import DB from '../../shared/db';
import { getDatabaseUrl } from './config';

export default class WebDB extends DB {
  constructor(username, password) {
    super(getDatabaseUrl(), username, password);
  }
}
