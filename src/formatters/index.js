import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatterSelector = (data) => {
  const format = _.isObject(data) ? data.format : data;

  if (format === 'plain') {
    return plain;
  }

  if (format === 'json') {
    return json;
  }

  if (format === 'stylish') {
    return stylish;
  }

  if (format !== 'json' && format !== 'plain' && format !== 'stylish') {
    throw new Error(`Uknown format: '${format}'`);
  }
};

export default formatterSelector;
