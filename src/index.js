import _ from 'lodash';
import parseFromPath from './parsers.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFromPath(filepath1);
  const file2 = parseFromPath(filepath2);

  const iter = (file1, file2) => {
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const keys = _.union(keys1, keys2)
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      });
  
    const arrOfObjects = keys.map((key) => {
      if (!Object.hasOwn(file2, key)) {
        return { key, type: 'deleted', value: file1[key] };
      }
      if (!Object.hasOwn(file1, key)) {
        return { key, type: 'added', value: file2[key] };
      }
      if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
        return { key, type: 'nested', children: iter(file1[key], file2[key]) };
      } else if (
        Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && _.isEqual(file1[key], file2[key])
      ) {
        return { key, type: 'unchanged', value: file1[key] };
      } else if (
        Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && !_.isEqual(file1[key], file2[key])
      ) {
        return {
          key, type: 'changed', value1: file1[key], value2: file2[key],
        };
      }
    }, []);
    return arrOfObjects;
  };

  // const resultedArr = iter(file1, file2);
  // const keys1 = Object.keys(file1);
  // const keys2 = Object.keys(file2);
  // const keys = _.union(keys1, keys2)
  //   .sort((a, b) => {
  //     if (a.toLowerCase() < b.toLowerCase()) {
  //       return -1;
  //     }
  //     if (a.toLowerCase() > b.toLowerCase()) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  // const arrOfObjects = keys.map((key) => {
  //   if (!Object.hasOwn(file2, key)) {
  //     return { key, type: 'deleted', value: file1[key] };
  //   }
  //   if (!Object.hasOwn(file1, key)) {
  //     return { key, type: 'added', value: file2[key] };
  //   }
  //   if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
  //     return { key, type: 'nested', children: genDiff(file1[key], file2[key]) };
  //   } else if (
  //     Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && _.isEqual(file1[key], file2[key])
  //   ) {
  //     return { key, type: 'unchanged', value: file1[key] };
  //   } else if (
  //     Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && !_.isEqual(file1[key], file2[key])
  //   ) {
  //     return {
  //       key, type: 'changed', value1: file1[key], value2: file2[key],
  //     };
  //   }
  // }, []);

  const resultedStr = stylish(iter(file1, file2));
  console.log(resultedStr);
  return resultedStr;
};

export default genDiff;
