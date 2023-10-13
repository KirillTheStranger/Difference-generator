//import { options } from '../../bin/gendiff.js';
import stylish from './stylish.js';

const chooseFormatter = (data) => {
  if (data.format === 'plain') {
    return plain();
  }

  return stylish();
};

export default chooseFormatter;