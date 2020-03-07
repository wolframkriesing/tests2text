import path from 'path';
import fs from 'fs';
import {extractTestSuites} from './extractTextFromTests.js';

const allCommandLineArgs = process.argv;
const indexOfFileName = allCommandLineArgs.findIndex(arg => arg === __filename) + 1;
const fileName = allCommandLineArgs[indexOfFileName];
const fullFileName = path.join(process.cwd(), fileName);
const sourceCode = fs.readFileSync(fullFileName, 'utf8');
const suites = extractTestSuites(sourceCode);

const printSuites = (suites, depth = 0) => {
  const prefix = new Array(depth).fill('  ').join('');
  suites.forEach(suite => {
    console.log(prefix + suite.name);
    suite.suites ? printSuites(suite.suites, depth + 1) : null;
  });
};
printSuites(suites);