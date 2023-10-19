import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const makePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(makePath(filepath), 'utf8');

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

const getFileExt = (filepath) => {
  const extention = filepath.includes('/') ? path.extname(filepath.split('/').at(-1)) : path.extname(filepath);
  return extention;
};

const parseFromPath = (data, extention) => {
  switch (extention) {
    case '.json':
      return parseJson(data);
    case '.yaml':
      return parseYaml(data);
    case '.yml':
      return parseYaml(data);
    default:
      throw new Error(`Unknown extantion: '${extention}'!`);
  }
};

export { parseFromPath, readFile, getFileExt };
