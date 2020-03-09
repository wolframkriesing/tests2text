import assert from 'assert';
import {it, describe} from 'mocha';

const stats = () => {
  return {counts: {tests: 0, suites: 0}};
};
describe('Provide statistics about test suites', () => {
  it('GIVEN no test suites and no tests THEN return 0 for everything', () => {
    const noSuites = [];
    assert.deepEqual(stats(noSuites), {counts: {tests: 0, suites: 0}});
  });
});