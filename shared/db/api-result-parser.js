// Parses results from kinto-http js library.
export const parseBatchResults = (results) => {
  let successes = [];
  let errors = [];
  results.forEach(result => {
    if (result.status === 200 || result.status === 201) {
      successes.push(result.body.data);
    } else if (result.status === 412) {
      errors.push({
        error: new Error('last modified precondition failed'),
        sentence: result.body && result.body.details && result.body.details.existing && result.body.details.existing.sentence,
      });
    } else {
      // TODO: what is the returned value here? We should add the failed sentence for this as well
      console.error('unrecognized result status', result.status, result);
      errors.push({
        error: new Error(`status ${result.status}, ${result.body.message}`),
      });
    }
  });

  return {
    successes,
    errors,
  };
};

export const checkResultForErrors = (results, expected) => {
  const { successes, errors } = parseBatchResults(results);
  if (errors.length > 0) {
    throw new Error('Failed: create sentence collections' + errors.join(','));
  }
  if (successes.length !== expected.length) {
    throw new Error('Failed: missing sentence collections');
  }

  return {
    successes,
    errors,
  };
};


