import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const makePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(makePath(filepath), 'utf8');

const parseJson = (filepath) => JSON.parse(readFile(filepath));
const parseYaml = (filepath) => yaml.load(readFile(filepath));

const getFileExt = (filepath) => {
  const extention = filepath.includes('/') ? path.extname(filepath.split('/').at(-1)) : path.extname(filepath);
  return extention;
};

const parseFromPath = (filepath) => {
  const fullPath = makePath(filepath);
  const extention = getFileExt(fullPath);

  switch (extention) {
    case '.json':
      return parseJson(fullPath);
    case '.yaml':
      return parseYaml(fullPath);
    case '.yml':
      return parseYaml(fullPath);
    default:
      throw new Error(`Unknown extantion: '${extention}'!`);
  }
};

export { parseFromPath, readFile };
