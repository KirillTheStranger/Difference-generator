import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const currentIndent = getIndent(depth);
    const bracketIndent = getIndent(depth);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}      ${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}  }`,
    ].join('\n');
  };

  return iter(data, currentDepth);
};

const stylish = (data) => {
  const iter = (iterData, depth) => {
    const currentIndent = getIndent(depth);
    const bracketIndent = getIndent(depth);

    const result = iterData.map((content) => {
      switch (content.type) {
        case 'nested':
          return `${currentIndent}  ${content.key}: {\n${iter(content.children, depth + 1)}\n${bracketIndent}  }`;
        case 'removed':
          return `${currentIndent}- ${content.key}: ${stringify(content.value, depth)}`;
        case 'added':
          return `${currentIndent}+ ${content.key}: ${stringify(content.value, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${content.key}: ${stringify(content.value, depth)}`;
        case 'updated':
          return [`${currentIndent}- ${content.key}: ${stringify(content.value1, depth)}`, `${currentIndent}+ ${content.key}: ${stringify(content.value2, depth)}`].join('\n');
        default:
          throw new Error(`Uknown type: ${content.type}`);
      }
    });
    return result.join('\n');
  };
  return ['{', iter(data, 1), '}'].join('\n');
};

export default stylish;
