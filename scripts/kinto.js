import DB from '../server/kinto.js';

const remote = process.env.KINTO_URL_LOCAL;
const username = process.env.KINTO_USER;
const password = process.env.KINTO_PASSWORD;

initDB();

async function initDB() {
  const db = new DB(remote, username, password);
  await db.initDB();
}