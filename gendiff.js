#!/usr/bin/env node

import { program } from 'commander';
import * as fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parse } from './parse.js';
import _ from "lodash";

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const path1 = path.resolve(process.cwd(), filepath1);
    const path2 = path.resolve(process.cwd(), filepath2);

    const file1 = parse(fs.readFileSync(path1, 'utf8'));
    const file2 = parse(fs.readFileSync(path2, 'utf8'));

    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);

    const arrOfBothKeys = [...keys1, ...keys2];
    const sortedKeys = arrOfBothKeys
      .reduce((acc, key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    
    const resultedArr = sortedKeys.reduce((acc, key) => {
      if (file1[key] === file2[key]) {
          acc.push(`   ${key}: ${file1[key]}`);
      }
      if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
          acc.push(` - ${key}: ${file1[key]}`);
      }
      if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
          acc.push(` + ${key}: ${file2[key]}`);
      }
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && file1[key] !== file2[key]) {
          acc.push(` - ${key}: ${file1[key]}`);
          acc.push(` + ${key}: ${file2[key]}`);
      }
      return acc;
    }, [])

    const resultedStr = `{\n${resultedArr.join('\n')}\n}`
    console.log(resultedStr);
  });

program.parse();