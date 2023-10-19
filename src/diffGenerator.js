import _ from 'lodash';

const diffGenerator = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const typedData = keys.map((key) => {
    if (!Object.hasOwn(content2, key)) {
      return { key, type: 'removed', value1: content1[key] };
    }
    if (!Object.hasOwn(content1, key)) {
      return { key, type: 'added', value2: content2[key] };
    }
    if (typeof content1[key] === 'object' && typeof content2[key] === 'object') {
      return { key, type: 'nested', children: diffGenerator(content1[key], content2[key]) };
    }
    if (_.isEqual(content1[key], content2[key])
    ) {
      return { key, type: 'unchanged', value1: content1[key] };
    }
    if (!_.isEqual(content1[key], content2[key])) {
      return {
        key, type: 'updated', value1: content1[key], value2: content2[key],
      };
    }
    throw new Error('Unknown data');
  }, []);
  return typedData;
};

export default diffGenerator;
