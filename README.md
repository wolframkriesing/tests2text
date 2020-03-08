# tests2text
Extract the test descriptions from a set of tests.

## A use case please

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
```


## Run it
- `./run.sh /bin/bash` to enter the docker container that contains the environment and the app
- `./run.sh npm run parse-file <path/to/testfile.js>` to parse the test descriptions out of the given file and write it to stdout