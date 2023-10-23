import { parseFromPath, readFile, getFileExt } from './parsers.js';
import diffGenerator from './diffGenerator.js';
import formatter from './formatters/index.js';

const getData = (filepath) => {
  const extension = getFileExt(filepath);
  const content = readFile(filepath);
  const data = parseFromPath(content, extension);
  return data;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const typedData = diffGenerator(data1, data2);
  const result = formatter(typedData, formatName);

  return result;
};

export default genDiff;
