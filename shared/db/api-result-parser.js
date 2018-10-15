// Parses results from kinto-http js library.
export const parseBatchResults = (results) => {
  let successes = [];
  let errors = [];
  results.forEach(result => {
    if (result.status === 200 || result.status === 201) {
      successes.push(result.body.data);
    } else if (result.status === 403) {
      errors.push(new Error('item already submitted by another user'));
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
