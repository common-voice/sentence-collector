import KintoTestServer from "kinto-node-test-server";
import DB from '../shared/db';

async function run() {
  const server = new KintoTestServer(DB.REMOTE_URL);

  try {
    await server.flush();
    console.log('database flushed');
  } catch (err) {
    console.error('db flush error', err);
  }
}

run();
