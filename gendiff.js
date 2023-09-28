#!/usr/bin/env node

import { program } from 'commander';
import * as fs from 'node:fs';
//import { parse } from '../parse.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(fs.readFileSync(filepath1, 'utf8'));
    console.log(fs.readFileSync(filepath2, 'utf8'));
  });

program.parse();