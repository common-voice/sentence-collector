const MAX_BATCH_REQUEST = 25;
const MAX_CONCURRENCY = 1;

const batcher = async (dbContainer, method, data, options, bar) => {
  let successes = [];

  const runBatchesUntilDrain = async () => {
    while (data.length > 0) {
      const jobs = data.splice(0, MAX_BATCH_REQUEST);
      const results = await dbContainer.batch(batch => {
        jobs.forEach(item => {
          batch[method](item, options);
        });
      });
      successes = successes.concat(results);
      if (!bar.complete) {
        bar.tick(jobs.length);
      }
    }
  };

  let jobPipelines = [];
  for (let i = 0; i < MAX_CONCURRENCY; i++) {
    jobPipelines.push(runBatchesUntilDrain());
  }

  await Promise.all(jobPipelines);
  return successes;
};

export default batcher;
