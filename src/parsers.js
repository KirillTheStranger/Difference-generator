import yaml from 'js-yaml';

const parseData = (data, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extantion: '${extention}'!`);
  }
};

export default parseData;
