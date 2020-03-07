import path from 'path';
import fs from 'fs';
import {extractTestSuites} from './extractTextFromTests.js';

const allCommandLineArgs = process.argv;
const indexOfFileName = allCommandLineArgs.findIndex(arg => arg === __filename) + 1;
const fileName = allCommandLineArgs[indexOfFileName];
const fullFileName = path.join(process.cwd(), fileName);
const sourceCode = fs.readFileSync(fullFileName, 'utf8');
const suites = extractTestSuites(sourceCode);

console.log(JSON.stringify(suites, null, 2));