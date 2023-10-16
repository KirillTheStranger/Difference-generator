import _ from 'lodash';

const plain = (data) => {
  const makeComplexValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (value === false || value === true || value === null || value === undefined || value === 0) {
      return `${value}`;
    }
    return `'${value}'`;
  };

  const sliced = (str) => str.slice(1, str.length);

  const iter = (iterData, depthKey) => {
    const result = iterData.filter(({ type }) => type !== 'unchanged')
      .flatMap(({
        key, type, value1, value2, children,
      }) => {
        const curKeyName = `${depthKey}.${key}`;
        if (type === 'nested') {
          return iter(children, curKeyName);
        }
        if (type === 'updated') {
          return `Property '${sliced(curKeyName)}' was updated. From ${makeComplexValue(value1)} to ${makeComplexValue(value2)}`;
        }
        if (type === 'removed') {
          return `Property '${sliced(curKeyName)}' was removed`;
        }
        return `Property '${sliced(curKeyName)}' was added with value: ${makeComplexValue(value2)}`;
      });
    return result.join('\n');
  };
  return iter(data, '');
};

export default plain;
