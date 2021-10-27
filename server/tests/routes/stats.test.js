import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import sentences from '../../lib/sentences';

const allStats = {
  en: {
    added: 5,
    validated: 3,
  },
};

const totalStats = {
  total: 5,
  languages: 1,
};

const userUnreviewedStats = {
  en: 2,
};

const generalStats = {
  validated: 2,
  rejected: 1,
  added: 3,
  contributors: 3,
};

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(sentences, 'getStats').resolves({
    all: allStats,
    totals: totalStats,
  });
  t.context.sandbox.stub(sentences, 'getUnreviewedByYouCountForLocales').resolves(userUnreviewedStats);
  t.context.sandbox.stub(sentences, 'getAllStatsForLocale').resolves(generalStats);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get stats', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/stats?locales=en,de');

  t.log(response);

  t.is(response.status, 200);
  t.deepEqual(response.body, {
    all: allStats,
    totals: totalStats,
    userUnreviewed: userUnreviewedStats,
  });
});

test.serial('should return default stats if no locale passed', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/stats?locales=');

  t.log(response);

  t.is(response.status, 200);
  t.deepEqual(response.body, {
    all: {},
    totals: {
      total: 0,
      languages: 0,
    },
    userUnreviewed: {},
  });
});

test.serial('should pass on error message', async (t) => {
  sentences.getUnreviewedByYouCountForLocales.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/stats?locales=en,de');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_STATS_ERROR',
  });
});

test.serial('should query general stats for locale', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/stats/general/en');

  t.log(response);

  t.is(response.status, 200);
  t.deepEqual(response.body, generalStats);
});

test.serial('should pass on error message when querying general stats', async (t) => {
  sentences.getAllStatsForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/stats/general/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_STATS_FOR_LANGUAGE_ERROR',
  });
});
