import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormatterFrom = (data) => {
  if (_.isObject(data) && data.format === 'plain') {
    return plain;
  }

  if (_.isObject(data) && data.format === 'json') {
    return json;
  }

  if (data === 'plain') {
    return plain;
  }

  if (data === 'json') {
    return json;
  }

  return stylish;
};

export default chooseFormatterFrom;
