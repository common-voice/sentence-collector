import test from 'ava';
import connectionString from '../../lib/connectionString';

test('parses correct string', async (t) => {
  const connectionURI = 'mysql://foo:password@localhost/database';
  const result = connectionString.parse(connectionURI);

  t.deepEqual(result, {
    username: 'foo',
    password: 'password',
    host: 'localhost',
    database: 'database',
  });
});

test('throws if no protocol passed', async (t) => {
  const connectionURI = 'foo:password@localhost/database';
  const error = t.throws(() => connectionString.parse(connectionURI));

  t.true(error.message.includes('No scheme found in URI'));
});
