import hashJS from 'hash.js';

const hash = (input) => {
  return hashJS.sha256().update(input).digest('hex');
};

export default hash;
