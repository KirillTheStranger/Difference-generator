import { parseFromPath, readFile, getFileExt } from './parsers.js';
import diffGenerator from './diffGenerator.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const [data1, extantion1] = [readFile(filepath1), getFileExt(filepath1)];
  const [data2, extantion2] = [readFile(filepath2), getFileExt(filepath2)];
  const contentOfFile1 = parseFromPath(data1, extantion1);
  const contentOfFile2 = parseFromPath(data2, extantion2);

  const typedData = diffGenerator(contentOfFile1, contentOfFile2);
  const result = formatter(typedData, formatName);

  return result;
};

export default genDiff;
