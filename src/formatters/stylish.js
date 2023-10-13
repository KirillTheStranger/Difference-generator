import { makeStrFromValue } from '../helpers.js';

const stylish = (array, replacer = ' ', spacesCount = 4) => {
  const iter = (arr, depth) => {
    const indentSize = (depth * spacesCount) - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount + 2);

    const result = arr.map(({
      key, type, value, value1, value2, children,
    }) => {
      if (type === 'nested') {
        return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
      }

      switch (type) {
        case 'removed':
          return `${currentIndent}- ${key}: ${makeStrFromValue(value, depth)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${makeStrFromValue(value, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${makeStrFromValue(value, depth)}`;
        case 'updated':
          return `${currentIndent}- ${key}: ${makeStrFromValue(value1, depth)}\n${currentIndent}+ ${key}: ${makeStrFromValue(value2, depth)}`;
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
