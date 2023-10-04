import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parseJson = (file) => JSON.parse(file);
const parseYaml = (file) => yaml.load(file);

const readFile = (filepath) => (fs.readFileSync(filepath, 'utf8'));
const getFileExt = (filepath) => {
  let extention;
  if (filepath.includes('/')) {
    extention = path.extname(filepath.split('/').at(-1));
  } else {
    extention = path.extname(filepath);
  }
  return extention;
};

const parseFromPath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extention = getFileExt(fullPath);

  let file;
  if (extention === '.json') {
    file = parseJson(readFile(fullPath));
  }

  if (extention === '.yaml' || extention === '.yml') {
    file = parseYaml(readFile(fullPath));
  }

  return file;
};

export default parseFromPath;
