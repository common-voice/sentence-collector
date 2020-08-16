import test from 'ava';
import request from 'supertest';
import app from '../../app';

test.serial('should return 404 when no user', async (t) => {
  const response = await request(app)
    .get('/users/whoami');

  t.is(response.status, 404);
});
