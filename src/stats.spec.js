import assert from 'assert';
import {describe, it} from 'mocha';

const countSuites = (suites) => {
  const reducer = (count, suite) => {
    const childSuites = suite.suites ? suite.suites : [];
    return count + countSuites(childSuites);
  };
  const childrenCount = suites.reduce(reducer, 0);
  return childrenCount + suites.length;
};
const stats = (suites) => {
  return {counts: {tests: 0, suites: countSuites(suites)}};
};
describe('Provide statistics about test suites', () => {
  it('GIVEN no test suites and no tests THEN return 0 for everything', () => {
    const noSuites = [];
    assert.deepEqual(stats(noSuites), {counts: {tests: 0, suites: 0}});
  });
  it('GIVEN one test suite with no tests THEN return the counts: suites=1, tests=0', () => {
    const suite = {name: 'test suite', tests: []};
    const suites = [suite];
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 1}});
  });
  it('GIVEN one test suite containing another one THEN return the counts: suites=2, tests=0', () => {
    const suite = {name: 'suite', tests: [], suites: [{name: 'suite'}]};
    const suites = [suite];
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 2}});
  });
  it('GIVEN two test suites containing two each THEN return the counts: suites=6, tests=0', () => {
    const aSuite = {name: 'suite'};
    const suite = {name: 'suite', tests: [], suites: [aSuite, aSuite]};
    const suites = [suite, suite];
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 6}});
  });
  it('GIVEN suites multiple levels deep THEN return the right counts', () => {
    const suites = [
      {name: ''},
      {name: '', suites: [{name: ''}]},
      {name: '', suites: [{name: '', suites: [{name: ''}]}]},
      {name: '', suites: [{name: '', suites: [{name: ''}, {name: ''}]}]}
    ];
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 10}});
  });
  it('no suites just tests', () => {
    
  });
  it('nested suites', () => {

  });
  it('multiple tests in different suites', () => {

  });
});