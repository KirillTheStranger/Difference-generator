import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatterFrom = (data) => {
  if (data.format === 'plain') {
    return plain;
  }

  return stylish;
};

export default chooseFormatterFrom;
