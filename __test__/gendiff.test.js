import { getFixturePath } from '../src/helpers.js';
import genDiff from '../src/index.js';
import {
  jsonResult1, jsonResult2, jsonResult3, yamlResult4, yamlResult5, yamlResult6,
} from '../__fixtures__/result_file.js';

let jsonTestFile1;
let jsonTestFile2;
let jsonTestFile3;
let yamlTestFile4;
let yamlTestFile5;
let yamlTestFile6;

beforeAll(() => {
  jsonTestFile1 = getFixturePath('file1.json');
  jsonTestFile2 = getFixturePath('file2.json');
  jsonTestFile3 = getFixturePath('file3.json');
  yamlTestFile4 = getFixturePath('file4.yml');
  yamlTestFile5 = getFixturePath('file5.yml');
  yamlTestFile6 = getFixturePath('file6.yml');
});

test('both json.files have common and different data', () => {
  const result = jsonResult1;
  expect(genDiff(jsonTestFile1, jsonTestFile2)).toEqual(result);
});

test('compare empty and non-empty json.files', () => {
  const result = jsonResult2;
  expect(genDiff(jsonTestFile1, jsonTestFile3)).toEqual(result);
});

test('compare two empty json.files', () => {
  const result = jsonResult3;
  expect(genDiff(jsonTestFile3, jsonTestFile3)).toEqual(result);
});

test('both yml.files have common and different data', () => {
  const result = yamlResult4;
  expect(genDiff(yamlTestFile4, yamlTestFile5)).toEqual(result);
});

test('compare empty and non-empty yml.files', () => {
  const result = yamlResult5;
  expect(genDiff(yamlTestFile4, yamlTestFile6)).toEqual(result);
});

test('compare two empty yml.files', () => {
  const result = yamlResult6;
  expect(genDiff(yamlTestFile6, yamlTestFile6)).toEqual(result);
});
