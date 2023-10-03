import { getFixturePath } from '../helpers.js';
import genDiff from '../index.js';
import { result1, result2, result3 } from '../__fixtures__/result_file.js';

let testFile1;
let testFile2;
let testFile3;

beforeAll(() => {
  testFile1 = getFixturePath('test_file1.json');
  testFile2 = getFixturePath('test_file2.json');
  testFile3 = getFixturePath('test_file3.json');
});

test('both files have common and different data', () => {
  const result = result1;
  expect(genDiff(testFile1, testFile2)).toEqual(result);
});

test('compare empty and non-empty files', () => {
  const result = result2;
  expect(genDiff(testFile2, testFile3)).toEqual(result);
});

test('compare two empty files', () => {
  const result = result3;
  expect(genDiff(testFile3, testFile3)).toEqual(result);
});
