import _ from 'lodash';

const obj1 = {
    "common": {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value",
        "doge": {
          "wow": ""
        }
      }
    },
    "group1": {
      "baz": "bas",
      "foo": "bar",
      "nest": {
        "key": "value"
      }
    },
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
};

const obj2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};

const obj3 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

const obj4 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};

const buildDiffTree = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
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
      if (!Object.hasOwn(obj2, key)) {
        return { key, type: 'deleted', value: obj1[key] };
      }
      if (!Object.hasOwn(obj1, key)) {
        return { key, type: 'added', value: obj2[key] };
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return { key, type: 'nested', children: buildDiffTree(obj1[key], obj2[key]) };
      } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && _.isEqual(obj1[key], obj2[key])) {
        return { key, type: 'unchanged', value: obj1[key] };
      } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && !_.isEqual(obj1[key], obj2[key])) {
        return { key, type: 'changed', value1: obj1[key], value2: obj2[key] };
      }
  }, []);

  return arrOfObjects;
};

const makeStrFromValue = (value, currentDepth, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = (depth * spacesCount) + 4;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
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

const stringify = (array, replacer = ' ', spacesCount = 4) => {
  const iter = (arr, depth) => {
    const indentSize = (depth * spacesCount) - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount + 2);

    const result = arr.map(({ key, type, value, value1, value2, children }) => {
        if (type === 'nested') {
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        }
    
        switch (type) {
          case 'deleted':
            return `${currentIndent}- ${key}: ${makeStrFromValue(value, depth)}`;
          case 'added':
            return `${currentIndent}+ ${key}: ${makeStrFromValue(value, depth)}`;
          case 'unchanged':
            return `${currentIndent}  ${key}: ${makeStrFromValue(value, depth)}`;
          case 'changed':
            return `${currentIndent}- ${key}: ${makeStrFromValue(value1, depth)}\n${currentIndent}+ ${key}: ${makeStrFromValue(value2, depth)}`;
        }   
      });
      return [
        '{',
        ...result,
        `${bracketIndent}}`,
      ].join('\n');
    };
  return iter(array, 1)
};

const x = stringify(buildDiffTree(obj1, obj2));

console.log(x);