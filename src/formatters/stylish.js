import _ from 'lodash';

// const getIndent = (depth, replaceValue, spaceCount) => {
//   const indentSize = (depth * spaceCount) - 2;
//   const currentIndent = replaceValue.repeat(indentSize);
//   const bracketIndent = replaceValue.repeat(indentSize - spaceCount + 2);
//   return [currentIndent, bracketIndent];
// };

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth) => {
  const iter = (currentValue, currentDepth, replaceValue = ' ', spaceCount = 4) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    // const indentSize = (currentDepth * spaceCount) + 4;
    // const currentIndent = replaceValue.repeat(indentSize);
    // const bracketIndent = replaceValue.repeat(indentSize - spaceCount);
    const currentIndent = getIndent(currentDepth);
    const bracketIndent = getIndent(currentDepth);

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
  const iter = (iterData, depth, replaceValue = ' ', spacesCount = 4) => {
    const currentIndent = getIndent(depth);
    const bracketIndent = getIndent(depth);
    // const [currentIndent, bracketIndent] = getIndent(depth, replaceValue, spacesCount);
    const result = iterData.map(({
      key, type, value1, value2, children,
    }) => {
      switch (type) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${stringify(value1, depth)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value2, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value1, depth)}`;
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
