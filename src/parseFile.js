import {extractTextFromFile} from './extractTextFromFile.js';

const printTests = (tests, depth) => {
  const prefix = new Array(depth).fill('  ').join('');
  tests.forEach(test => console.log(prefix + test.name));
};
const printTestSuites = (suites, depth = 0) => {
  const prefix = new Array(depth).fill('  ').join('');
  suites.forEach(suite => {
    console.log(prefix + suite.name);
    printTests(suite.tests, depth + 1);
    suite.suites ? printTestSuites(suite.suites, depth + 1) : null;
  });
};

const allCommandLineArgs = process.argv;
const indexOfFileName = allCommandLineArgs.findIndex(arg => arg === __filename) + 1;
const fileName = allCommandLineArgs[indexOfFileName];

(async () => {
  let testSuites;
  try {
    testSuites = await extractTextFromFile(fileName);
  } catch(e) {
    console.log(`ERROR reading file, error was: ${e}`);
    return;
  }
  printTestSuites(testSuites);
})();
