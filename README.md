# test-stitcher
Extract the test descriptions from a set of tests.  
**This project was made so one can read the tests, to understand what the code does.**

## TL;DR
- `git clone <this repo>`
- `./run.sh npm install` install app inside a docker container (or if you really should still have
  a global nodejs installation, you can also do `npm install`)
- `./run.sh npm run parse-file src/extractTextFromTests.spec.js`
  show all test descriptions of a local test file
- `./run.sh npm run parse-file https://katas.tddbin.com/katas/es1/language/global-api/parseInt.js`
  show them from a remote file

## A use case
Given a test file like the following
```javascript
describe('Extract the text from tests', () => {
  describe('GIVEN a string', () => {
    it('WHEN it is empty THEN return no test suites', () => {
      assert.deepStrictEqual(extractTestSuites(''), []);
    });
    it('WHEN it contains not test THEN return no test suites', () => {
      assert.deepStrictEqual(extractTestSuites('var x = 1; // but no test'), []);
    });
    describe('WHEN it contains one `describe`', () => {
      it('THEN return one test suite', () => {
        assert.strictEqual(extractTestSuites('describe("")').length, 1);
      });
      it('THEN return the test suite`s name', () => {
        const suites = extractTestSuites('describe("test suite")');
        assert.strictEqual(suites[0].name, 'test suite');
      });
    });
  });
});
```
When you run `npm run parse-file <the-filename-of-the-file-above>`, you will get this on the
command line:
```text
Extract the text from tests
  GIVEN a string
    WHEN it is empty THEN return no test suites
    WHEN it contains not test THEN return no test suites
    WHEN it contains one `describe`
      THEN return one test suite
      THEN return the test suite`s name

Statistics
-----------
{
    "counts": {
        "tests": 4,
        "suites": 3
    }
}
```

## Why?
I believe tests are not just for validating the code one writes, I believe **tests
are the driver for the code one writes**. That means, writing a test has been preceeded
by thinking what one wants. The tests are only the result of that thought process,
and become a structured mean that reflects the use cases and the responsibilities 
that the code shall fulfill. Therefore, I strongly believe (and try to practice) 
writing tests that state what I expect the code to do. That means a colleague (and not
just another developer) should be able to read and make sense of my tests.
That's why the real domain language and not the tech language shall be used in tests.

**__Test-stitcher__ is made so one can read the tests, to understand what the code does.**

## Develop and run
This project requires only docker to run. Every excutable can be prefixed simply by `./run.sh`
which runs the command inside the docker container.
You can also run it when nodejs is installed on your machine, just leave out the prefix `./run.sh`.

Getting started:
- `./run.sh npm i` - will install all nodejs dependencies this project needs to run
- `./run.sh npm test` - run the tests
- `./run.sh npm run parse-file src/extractTextFromTests.spec.js` - print the test descriptions
  of the given file

The most important commands:
- `./run.sh /bin/bash` to enter the docker container that contains the environment and the app
- `./run.sh npm i` to install all the dependencies
- `./run.sh npm test` to run the tests
- `./run.sh npm run parse-file <path/to/testfile.js>` to parse the test descriptions out of the given file and write it to stdout