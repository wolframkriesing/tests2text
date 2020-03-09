import path from 'path';
import fs from 'fs';
import https from 'https';
import {extractTestSuites} from "./extractTextFromTests.js";

const readFromLocalFilesystem = (fileName) => {
  const fullFileName = path.join(process.cwd(), fileName);
  const sourceCode = fs.readFileSync(fullFileName, 'utf8');
  return sourceCode;
};
const readSizeLimit = 2 * 1024 * 1024; // 1MB = 1024 * 1024
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
      res.on('data', (chunk) => {
        rawData += chunk;
        if (rawData.length > readSizeLimit) {
          res.destroy(Error(`Stop receiving, size limit (${readSizeLimit}) reached.`));
        }
      });
      res.on('end', () => {resolve(rawData);});
    }).on('error', (e) => {
      reject('error reading file: ' + e.message);
    });
  });
};
export const extractTextFromFile = async (fileName) => {
  const readFileFunction = fileName.startsWith('http') ? readFromWeb : readFromLocalFilesystem;
  let sourceCode;
  try {
    sourceCode = await readFileFunction(fileName);
  } catch(e) {
    throw(`ERROR reading file (using ${readFileFunction.name}, error was: ${e}`);
  }
  return extractTestSuites(sourceCode);
};
