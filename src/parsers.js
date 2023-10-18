import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parseJson = (file) => JSON.parse(file);
const parseYaml = (file) => yaml.load(file);

const makePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(makePath(filepath), 'utf8');
const getFileExt = (filepath) => {
  const extention = filepath.includes('/') ? path.extname(filepath.split('/').at(-1)) : path.extname(filepath);
  return extention;
};

const parseFromPath = (filepath) => {
  const fullPath = makePath(filepath);
  const extention = getFileExt(fullPath);

  if (extention === '.json') {
    return parseJson(readFile(fullPath));
  }

  if (extention === '.yaml' || extention === '.yml') {
    return parseYaml(readFile(fullPath));
  }

  return null;
};

export { parseFromPath, readFile };
