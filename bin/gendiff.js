#!/usr/bin/env node

import _ from 'lodash';
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const formatName = _.isObject(program.opts()) ? program.opts().format : program.opts();
    console.log(genDiff(filepath1, filepath2, formatName));
  });

program.parse();
