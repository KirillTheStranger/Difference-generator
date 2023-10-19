import _ from 'lodash';

const makeComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (value === false || value === true || value === null || value === undefined || value === 0) {
    return `${value}`;
  }
  return `'${value}'`;
};

const plain = (data) => {
  const sliced = (str) => str.slice(1, str.length);

  const iter = (iterData, depthKey) => {
    const result = iterData.flatMap(({
      key, type, value1, value2, children,
    }) => {
      const curKeyName = `${depthKey}.${key}`;
      switch (type) {
        case 'added':
          return `Property '${sliced(curKeyName)}' was added with value: ${makeComplexValue(value2)}`;
        case 'nested':
          return iter(children, curKeyName);
        case 'updated':
          return `Property '${sliced(curKeyName)}' was updated. From ${makeComplexValue(value1)} to ${makeComplexValue(value2)}`;
        case 'removed':
          return `Property '${sliced(curKeyName)}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Uknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(data, '');
};

export default plain;
