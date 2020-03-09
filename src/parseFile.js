import path from 'path';
import fs from 'fs';
import https from 'https';
import {extractTestSuites} from './extractTextFromTests.js';

const readFromLocalFilesystem = (fileName) => {
  const fullFileName = path.join(process.cwd(), fileName);
  const sourceCode = fs.readFileSync(fullFileName, 'utf8');
  return sourceCode;
};
const readFromWeb = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const {statusCode} = res;
      if (statusCode !== 200) {
        reject(`status=${statusCode}, error reading URL "${url}"`);
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {resolve(rawData);});
    }).on('error', (e) => {
      reject('error reading file: ' + e.message);
    });
  });
};
const printTests = (tests, depth) => {
  const prefix = new Array(depth).fill('  ').join('');
  tests.forEach(test => console.log(prefix + test.name));
};
const printSuites = (suites, depth = 0) => {
  const prefix = new Array(depth).fill('  ').join('');
  suites.forEach(suite => {
    console.log(prefix + suite.name);
    printTests(suite.tests, depth + 1);
    suite.suites ? printSuites(suite.suites, depth + 1) : null;
  });
};

const allCommandLineArgs = process.argv;
const indexOfFileName = allCommandLineArgs.findIndex(arg => arg === __filename) + 1;
const fileName = allCommandLineArgs[indexOfFileName];

(async () => {
  const readFileFunction = fileName.startsWith('http') ? readFromWeb : readFromLocalFilesystem;
  let sourceCode;
  try {
    sourceCode = await readFileFunction(fileName);
  } catch(e) {
    console.log(`ERROR reading file (using ${readFileFunction.name}, error was: ${e}`);
    return;
  }
  const suites = extractTestSuites(sourceCode);
  printSuites(suites);
})();
