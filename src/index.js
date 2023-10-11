import parseFromPath from './parsers.js';
import { addFormattedStr } from './helpers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFromPath(filepath1);
  const file2 = parseFromPath(filepath2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const sortedKeys = [...keys1, ...keys2]
    .reduce((acc, key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
      return 0;
    });

  const resultedArr = sortedKeys.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      addFormattedStr(acc, key, file1[key]);
    }
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      addFormattedStr(acc, key, file1[key], '-');
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      addFormattedStr(acc, key, file2[key], '+');
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && file1[key] !== file2[key]) {
      addFormattedStr(acc, key, file1[key], '-');
      addFormattedStr(acc, key, file2[key], '+');
    }
    return acc;
  }, []);

  const resultedStr = `{\n${resultedArr.join('\n')}\n}`;
  console.log(resultedStr);
  return resultedStr;
};

export default genDiff;