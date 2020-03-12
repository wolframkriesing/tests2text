import {extractTextFromFile} from './extractTextFromFile.js';
import {stats} from './stats.js';

const printTests = (tests, depth) => {
  const prefix = new Array(depth).fill('  ').join('');
  tests.forEach(test => console.log(prefix + test.name));
};
const printTestSuites = (all, depth = 0) => {
  const {suites} = all;
  const prefix = new Array(depth).fill('  ').join('');
  suites.forEach(suite => {
    console.log(prefix + suite.name);
    printTests(suite.tests, depth + 1);
    suite.suites ? printTestSuites(suite, depth + 1) : null;
  });
};
const printStats = (stats) => {
  console.log("\nStatistics\n-----------");
  console.log(JSON.stringify(stats, null, 4));
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
  printStats(stats(testSuites));
})();
