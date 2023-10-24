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
    const result = iterData.map((content) => {
      const curKeyName = `${depthKey}.${content.key}`;
      switch (content.type) {
        case 'added':
          return `Property '${sliced(curKeyName)}' was added with value: ${stringify(content.value)}`;
        case 'nested':
          return iter(content.children, curKeyName);
        case 'updated':
          return `Property '${sliced(curKeyName)}' was updated. From ${stringify(content.value1)} to ${stringify(content.value2)}`;
        case 'removed':
          return `Property '${sliced(curKeyName)}' was removed`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Uknown type: ${content.type}`);
      }
    })
      .filter((string) => string !== null);
    return result.join('\n');
  };
  return iter(data, '');
};

export default plain;
