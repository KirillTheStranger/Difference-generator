import * as fs from 'node:fs';
import path from 'node:path';
import parseFromPath from './parsers.js';
import calculateDiff from './calculateDiff.js';
import formatData from './formatters/index.js';

const getFileExt = (filepath) => path.extname(filepath).slice(1);
const makePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(makePath(filepath), 'utf8');

const getData = (filepath) => {
  const extension = getFileExt(filepath);
  const content = readFile(filepath);
  const data = parseFromPath(content, extension);
  return data;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const typedData = calculateDiff(data1, data2);
  const result = formatData(typedData, formatName);

  return result;
};

export { genDiff, readFile };
