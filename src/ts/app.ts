import DB from './db';

const USERNAME = 'admin';
const PASSWORD = 'password';

async function main() {
  const kinto = new DB(USERNAME, PASSWORD);
  const id = await kinto.getId();
  document.body.textContent = id;
}

main().catch(console.error.bind(console));
