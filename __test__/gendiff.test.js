import { getFixturePath } from '../src/helpers.js';
import genDiff from '../src/index.js';
import { readFile } from '../src/parsers.js';

test.each([
  ['Compare two json files', 'stylish', getFixturePath('file1.json'), getFixturePath('file2.json'), readFile(getFixturePath('result_files/stylishCompareTwoNonEmptyFiles.txt'))],
  ['Compare empty and non-empty json files', 'stylish', getFixturePath('file1.json'), getFixturePath('file3.json'), readFile(getFixturePath('result_files/stylishCompareEmptyWithNonEmptyFile.txt'))],
  ['Compare two empty json files', 'stylish', getFixturePath('file3.json'), getFixturePath('file3.json'), readFile(getFixturePath('result_files/compareTwoEmptyFiles.txt'))],
])('%s with %s format', (nameOfTest, format, filepath1, filepath2, expectedResult) => {
  expect(genDiff(filepath1, filepath2, format)).toEqual(expectedResult);
});

test('both json.files have common and different data, stylish format', () => {
  const result = readFile(getFixturePath('result_files/stylishCompareTwoNonEmptyFiles.txt'));
  const pathOfJsonTestFile1 = getFixturePath('file1.json');
  const pathOfJsonTestFile2 = getFixturePath('file2.json');
  const stylishFormat = 'stylish';
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, stylishFormat)).toEqual(result);
});

test('compare empty and non-empty json.files, stylish format', () => {
  const result = readFile(getFixturePath('result_files/stylishCompareEmptyWithNonEmptyFile.txt'));
  const pathOfJsonTestFile1 = getFixturePath('file1.json');
  const pathOfJsonTestFile3 = getFixturePath('file3.json');
  const stylishFormat = 'stylish';
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile3, stylishFormat)).toEqual(result);
});

test('compare two empty json.files, stylish format', () => {
  const result = readFile(getFixturePath('result_files/compareTwoEmptyFiles.txt'));
  const pathOfJsonTestFile3 = getFixturePath('file3.json');
  const stylishFormat = 'stylish';
  expect(genDiff(pathOfJsonTestFile3, pathOfJsonTestFile3, stylishFormat)).toEqual(result);
});

test('both yml.files have common and different data, stylish format', () => {
  const result = readFile(getFixturePath('result_files/stylishCompareTwoNonEmptyFiles.txt'));
  const pathOfYamlTestFile4 = getFixturePath('file4.yml');
  const pathOfYamlTestFile5 = getFixturePath('file5.yml');
  const stylishFormat = 'stylish';
  expect(genDiff(pathOfYamlTestFile4, pathOfYamlTestFile5, stylishFormat)).toEqual(result);
});

test('compare empty and non-empty yml.files, stylish format', () => {
  const result = readFile(getFixturePath('result_files/stylishCompareEmptyWithNonEmptyFile.txt'));
  const pathOfYamlTestFile4 = getFixturePath('file4.yml');
  const pathOfYamlTestFile6 = getFixturePath('file6.yml');
  const stylishFormat = 'stylish';
  expect(genDiff(pathOfYamlTestFile4, pathOfYamlTestFile6, stylishFormat)).toEqual(result);
});

test('compare two empty yml.files, stylish format', () => {
  const result = readFile(getFixturePath('result_files/compareTwoEmptyFiles.txt'));
  const pathOfYamlTestFile6 = getFixturePath('file6.yml');
  const stylishFormat = 'stylish';
  expect(genDiff(pathOfYamlTestFile6, pathOfYamlTestFile6, stylishFormat)).toEqual(result);
});

test('compare two empty json.files, plain format', () => {
  const result = readFile(getFixturePath('result_files/plainCompareTwoNonEmptyFiles.txt'));
  const pathOfJsonTestFile1 = getFixturePath('file1.json');
  const pathOfJsonTestFile2 = getFixturePath('file2.json');
  const plainFormat = 'plain';
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, plainFormat)).toEqual(result);
});

test('compare two empty yml.files, plain format', () => {
  const result = readFile(getFixturePath('result_files/plainCompareTwoNonEmptyFiles.txt'));
  const pathOfYamlTestFile4 = getFixturePath('file4.yml');
  const pathOfYamlTestFile5 = getFixturePath('file5.yml');
  const plainFormat = 'plain';
  expect(genDiff(pathOfYamlTestFile4, pathOfYamlTestFile5, plainFormat)).toEqual(result);
});

test('both json.files have common and different data, json format', () => {
  const result = readFile(getFixturePath('result_files/jsonCompareTwoNonEmptyFiles.txt'));
  const pathOfJsonTestFile1 = getFixturePath('file1.json');
  const pathOfJsonTestFile2 = getFixturePath('file2.json');
  const jsonFormat = 'json';
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, jsonFormat)).toEqual(result);
});

test('Unknown format', () => {
  const pathOfJsonTestFile1 = getFixturePath('file1.json');
  const pathOfJsonTestFile2 = getFixturePath('file2.json');
  const uknownFormat = 'oops';
  expect(() => genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, uknownFormat)).toThrow(Error);
});
