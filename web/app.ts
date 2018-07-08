import DB from '../shared/ts/db';

const USERNAME = 'admin';
const PASSWORD = 'password';

async function main() {
  const kinto = new DB(USERNAME, PASSWORD);
  await kinto.init();
  const id = await kinto.getId();
  document.body.textContent = id;
}

main().catch(console.error.bind(console));
