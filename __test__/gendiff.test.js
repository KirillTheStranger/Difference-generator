import getFixturePath from '../src/helpers.js';
import genDiff from '../src/index.js';
import { readFile } from '../src/parsers.js';

test.each([
  ['file1.json', 'file2.json', 'result_files/result_stylish.txt', 'stylish'],
  ['file1.json', 'file3.json', 'result_files/result_stylish_compare_with_empty.txt', 'stylish'],
  ['file1.json', 'file2.json', 'result_files/result_stylish.txt'],
  ['file1.yml', 'file2.yml', 'result_files/result_stylish.txt', 'stylish'],
  ['file1.yml', 'file3.yml', 'result_files/result_stylish_compare_with_empty.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'result_files/result_stylish.txt'],
  ['file1.json', 'file2.json', 'result_files/result_plain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'result_files/result_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'result_files/result_json.txt', 'json'],
])('Compare %p and %p. Result at: %s', (file1, file2, resultFile, format = 'stylish') => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format))
    .toEqual(readFile(getFixturePath(resultFile)));
});
