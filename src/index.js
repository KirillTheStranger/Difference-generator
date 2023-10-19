import _ from 'lodash';
import { parseFromPath } from './parsers.js';
import diffGenerator from './diffGenerator.js';
import formatterSelector from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const contentOfFile1 = parseFromPath(filepath1);
  const contentOfFile2 = parseFromPath(filepath2);
  const format = _.isObject(formatName) ? formatName.format : formatName;

  const typedData = diffGenerator(contentOfFile1, contentOfFile2);
  const formatter = formatterSelector(format);
  const result = formatter(typedData);

  return result;
};

export default genDiff;
