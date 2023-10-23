import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const currentIndent = getIndent(currentDepth);
    const bracketIndent = getIndent(currentDepth + 0.5);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}      ${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, depth);
};

const stylish = (data) => {
  const iter = (iterData, depth) => {
    const currentIndent = getIndent(depth);
    const bracketIndent = getIndent(depth - 0.5);

    const result = iterData.map(({
      key, type, value, value1, value2, children,
    }) => {
      switch (type) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value, depth)}`;
        case 'updated':
          return `${currentIndent}- ${key}: ${stringify(value1, depth)}\n${currentIndent}+ ${key}: ${stringify(value2, depth)}`;
        default:
          throw new Error(`Uknown type: ${type}`);
      }
    });
    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default stylish;
