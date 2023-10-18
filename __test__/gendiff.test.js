import getFixturePath from '../src/helpers.js';
import genDiff from '../src/index.js';
import { readFile } from '../src/parsers.js';

test.each([
  ['file1.json', 'file2.json', 'stylish', 'result_files/stylishCompareTwoFilesWithData.txt'],
  ['file1.json', 'file3.json', 'stylish', 'result_files/stylishCompareEmptyWithNonEmptyFile.txt'],
  ['file3.json', 'file3.json', 'stylish', 'result_files/compareTwoEmptyFiles.txt'],
  ['file4.yml', 'file5.yml', 'stylish', 'result_files/stylishCompareTwoFilesWithData.txt'],
  ['file4.yml', 'file6.yml', 'stylish', 'result_files/stylishCompareEmptyWithNonEmptyFile.txt'],
  ['file6.yml', 'file6.yml', 'stylish', 'result_files/compareTwoEmptyFiles.txt'],
  ['file1.json', 'file2.json', 'plain', 'result_files/plainCompareTwoFilesWithData.txt'],
  ['file4.yml', 'file5.yml', 'plain', 'result_files/plainCompareTwoFilesWithData.txt'],
  ['file1.json', 'file2.json', 'json', 'result_files/jsonCompareTwoFilesWithData.txt'],
])('Compare %p and %p with %s format', (file1, file2, format, resultFile) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format))
    .toEqual(readFile(getFixturePath(resultFile)));
});

test('Compare two files with unknown format', () => {
  const pathOfJsonTestFile1 = getFixturePath('file1.json');
  const pathOfJsonTestFile2 = getFixturePath('file2.json');
  const uknownFormat = 'oops';
  expect(() => genDiff(pathOfJsonTestFile1, pathOfJsonTestFile2, uknownFormat)).toThrow(Error);
});
