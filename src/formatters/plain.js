import _ from 'lodash';

const stringify = (value) => {
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
      key, type, value, value1, value2, children,
    }) => {
      const curKeyName = `${depthKey}.${key}`;
      switch (type) {
        case 'added':
          return `Property '${sliced(curKeyName)}' was added with value: ${stringify(value)}`;
        case 'nested':
          return iter(children, curKeyName);
        case 'updated':
          return `Property '${sliced(curKeyName)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'removed':
          return `Property '${sliced(curKeyName)}' was removed`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Uknown type: ${type}`);
      }
    })
      .filter((string) => string !== null);
    return result.join('\n');
  };
  return iter(data, '');
};

export default plain;
