import { getFixturePath } from '../src/helpers.js';
import genDiff from '../src/index.js';
import {
  stylishCompareTwoNonEmptyFiles,
  stylishCompareEmptyWithNonEmptyFile,
  compareTwoEmptyFiles,
  plainCompareTwoNonEmptyFiles,
  jsonCompareTwoNonEmptyFiles,
} from '../__fixtures__/result_file.js';

let pathOfJsonTestFile1;
let pathOfJsonTestFile2;
let pathOfJsonTestFile3;
let pathOfYamlTestFile4;
let pathOfYamlTestFile5;
let pathOfYamlTestFile6;
let stylishFormat;
let plainFormat;
let jsonFormat;
let uknownFormat;

beforeAll(() => {
  pathOfJsonTestFile1 = getFixturePath('file1.json');
  pathOfJsonTestFile2 = getFixturePath('file2.json');
  pathOfJsonTestFile3 = getFixturePath('file3.json');
  pathOfYamlTestFile4 = getFixturePath('file4.yml');
  pathOfYamlTestFile5 = getFixturePath('file5.yml');
  pathOfYamlTestFile6 = getFixturePath('file6.yml');
  stylishFormat = 'stylish';
  plainFormat = 'plain';
  jsonFormat = 'json';
  uknownFormat = 'oops';
});

test('both json.files have common and different data, stylish format', () => {
  const result = stylishCompareTwoNonEmptyFiles;
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, stylishFormat)).toEqual(result);
});

test('compare empty and non-empty json.files, stylish format', () => {
  const result = stylishCompareEmptyWithNonEmptyFile;
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile3, stylishFormat)).toEqual(result);
});

test('compare two empty json.files, stylish format', () => {
  const result = compareTwoEmptyFiles;
  expect(genDiff(pathOfJsonTestFile3, pathOfJsonTestFile3, stylishFormat)).toEqual(result);
});

test('both yml.files have common and different data, stylish format', () => {
  const result = stylishCompareTwoNonEmptyFiles;
  expect(genDiff(pathOfYamlTestFile4, pathOfYamlTestFile5, stylishFormat)).toEqual(result);
});

test('compare empty and non-empty yml.files, stylish format', () => {
  const result = stylishCompareEmptyWithNonEmptyFile;
  expect(genDiff(pathOfYamlTestFile4, pathOfYamlTestFile6, stylishFormat)).toEqual(result);
});

test('compare two empty yml.files, stylish format', () => {
  const result = compareTwoEmptyFiles;
  expect(genDiff(pathOfYamlTestFile6, pathOfYamlTestFile6, stylishFormat)).toEqual(result);
});

test('compare two empty yml.files, plain format', () => {
  const result = plainCompareTwoNonEmptyFiles;
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, plainFormat)).toEqual(result);
});

test('compare two empty yml.files, plain format', () => {
  const result = plainCompareTwoNonEmptyFiles;
  expect(genDiff(pathOfYamlTestFile4, pathOfYamlTestFile5, plainFormat)).toEqual(result);
});

test('both json.files have common and different data, json format', () => {
  const result = jsonCompareTwoNonEmptyFiles;
  expect(genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, jsonFormat)).toEqual(result);
});

test('Unknown format', () => {
  expect(() => genDiff(pathOfJsonTestFile1, pathOfJsonTestFile1, uknownFormat)).toThrow(Error);
});
