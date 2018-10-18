// Parses results from kinto-http js library.
export const parseBatchResults = (results) => {
  let successes = [];
  let errors = [];
  results.forEach(result => {
    if (result.status === 200 || result.status === 201) {
      successes.push(result.body.data);
    } else if (result.status === 403) {
      errors.push(new Error('item already submitted by another user'));
    } else if (result.status === 412) {
      errors.push(new Error('last modified precondition failed'));
    } else {
      console.error('unrecognized result status', result.status, result);
      errors.push(new Error(`status ${result.status}, ${result.body.message}`));
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


