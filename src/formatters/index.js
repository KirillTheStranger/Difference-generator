import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatterSelector = (data) => {
  const format = _.isObject(data) ? data.format : data;

  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Uknown format: '${format}'`);
  }
};

export default formatterSelector;
