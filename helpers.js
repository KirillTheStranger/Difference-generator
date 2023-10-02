import path from 'node:path';
import process from 'node:process';
import * as fs from 'node:fs';
import { fileURLToPath } from 'url';

const parse = (file) => JSON.parse(file);

const readFile = (filepath) => (fs.readFileSync(filepath, 'utf8'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const parseFromPath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const file = parse(readFile(fullPath));

  return file;
};

export { parseFromPath, getFixturePath };
