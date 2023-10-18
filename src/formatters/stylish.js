import _ from 'lodash';

const stylish = (array, replacer = ' ', spacesCount = 4) => {
  const stringify = (value, currentDepth, replaceValue = ' ', replacesCount = 4) => {
    const iter = (currentValue, depth) => {
      if (!_.isObject(currentValue)) {
        return `${currentValue}`;
      }

      const indentSize = (depth * replacesCount) + 4;
      const currentIndent = replaceValue.repeat(indentSize);
      const bracketIndent = replaceValue.repeat(indentSize - replacesCount);
      const lines = Object
        .entries(currentValue)
        .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

      return [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');
    };

    return iter(value, currentDepth);
  };

  const iter = (arr, depth) => {
    const indentSize = (depth * spacesCount) - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount + 2);

    const result = arr.map(({
      key, type, value1, value2, children,
    }) => {
      if (type === 'nested') {
        return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
      }

      switch (type) {
        case 'removed':
          return `${currentIndent}- ${key}: ${stringify(value1, depth)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value2, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value1, depth)}`;
        case 'updated':
          return `${currentIndent}- ${key}: ${stringify(value1, depth)}\n${currentIndent}+ ${key}: ${stringify(value2, depth)}`;
        default:
          return 'Default value';
      }
    });
    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(array, 1);
};

export default stylish;
