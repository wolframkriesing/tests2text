# tests2text
Extract the test descriptions from a set of tests.

## Run it
- `./run.sh /bin/bash` to enter the docker container that contains the environment and the app
- `./run.sh npm run parse-file <path/to/testfile.js>` to parse the test descriptions out of the given file and write it to stdout