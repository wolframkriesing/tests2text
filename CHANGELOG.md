# ideas
- [ ] `./run.sh npm run parse-file <path/to/testfile.js> -- --json` to parse the test descriptions out of the given file as JSON
- [ ] stats: LOC of a test
- [ ] lint: words used in test description and identifiers used in test code
      if there is no overlap WARN, show the overlap ...

# v1
- [x] `./run.sh npm i` to install all the dependencies
- [x] `./run.sh npm test` to run the tests
- [x] `./run.sh npm run parse-file <path/to/testfile.js>` to parse the test descriptions out of the given file 
- [x] extract the tests
- [x] parse files over http(s), e.g. jskatas katas, jslang katas
- [x] basic stats, #tests, #test suite
- [x] implement tests on the root level
- [ ] all `suites` need to be renamed to a better name, it used to be
      an array `[]` but it became `{suites: [], tests: []}` - What is a good name for it?