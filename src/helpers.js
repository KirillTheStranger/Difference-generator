import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const addFormattedStr = (array, value1, value2, operator = ' ') => {
  array.push(` ${operator} ${value1}: ${value2}`);
  return array;
};

export { getFixturePath, addFormattedStr };
