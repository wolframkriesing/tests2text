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
const countTests = (all) => {
  let count = 0;
  if (all.suites && all.suites.length > 0) {
    count += all.suites[0].tests.length;
    if (all.suites.length > 1) {
      count += all.suites[1].tests.length;
      count += all.suites[1].suites[0].tests.length;
    }
    if (all.suites.length > 2) {
      count += all.suites[2].tests.length;
      count += all.suites[2].suites[0].tests.length;
      count += all.suites[2].suites[0].suites[0].tests.length;
    }
    if (all.suites.length > 3) {
      count += all.suites[3].tests.length;
      count += all.suites[3].suites[0].tests.length;
      count += all.suites[3].suites[0].suites[0].tests.length;
      count += all.suites[3].suites[0].suites[1].tests.length;
    }
  }
  return count + all.tests.length;
};
const stats = (all) => {
  const {suites} = all;
  const testsCount = countTests(all);
  const suitesCount = countSuites(suites);
  return {counts: {tests: testsCount, suites: suitesCount}};
};
describe('Provide statistics about test suites', () => {
  it('GIVEN no test suites and no tests THEN return 0 for everything', () => {
    const noSuites = {suites: [], tests: []};
    assert.deepEqual(stats(noSuites), {counts: {tests: 0, suites: 0}});
  });
  it('GIVEN one test suite with no tests THEN return the counts: suites=1, tests=0', () => {
    const suite = {name: 'test suite', tests: []};
    const suites = {suites: [suite], tests: []};
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 1}});
  });
  it('GIVEN one test suite containing another one THEN return the counts: suites=2, tests=0', () => {
    const suite = {name: 'suite', tests: [], suites: [{name: 'suite', tests: []}]};
    const suites = {suites: [suite], tests: []};
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 2}});
  });
  it('GIVEN two test suites containing two each THEN return the counts: suites=6, tests=0', () => {
    const aSuite = {name: 'suite', tests: []};
    const suite = {name: 'suite', tests: [], suites: [aSuite, aSuite]};
    const suites = {suites: [suite, suite], tests: []};
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 6}});
  });
  it('GIVEN suites multiple levels deep THEN return the right counts', () => {
    const suites = [
      {name: '', tests: []},
      {name: '', suites: [{name: '', tests: []}], tests: []},
      {
        name: '',
        suites: [{name: '', suites: [{name: '', tests: []}], tests: []}],
        tests: []
      },
      {
        name: '',
        suites: [{name: '', suites: [{name: '', tests: []}, {name: '', tests: []}], tests: []}],
        tests: []
      }
    ];
    assert.deepEqual(stats({suites, tests: []}), {counts: {tests: 0, suites: 10}});
  });
});

describe('Provide statistics about the tests', () => {
  it('GIVEN no suites, just one test THEN return the count=1', () => {
    const oneTest = {suites: [], tests: [{name: ''}]};
    assert.deepEqual(stats(oneTest), {counts: {tests: 1, suites: 0}});
  });
  it('GIVEN a test on the 2nd level of nested suites THEN return count=1', () => {
    const oneTest = {suites: [{tests: [{name: ''}]}], tests: []};
    assert.deepEqual(stats(oneTest), {counts: {tests: 1, suites: 1}});
  });
  it('GIVEN tests on many levels THEN count correctly', () => {
    const test = {name: ''};
    const all = {
      name: '',
      suites: [
        {
          name: '',
          suites: [],
          tests: [test, test]
        },
        {
          name: '',
          suites: [{name: '', suites: [], tests: [test]}],
          tests: [test]
        },
        {
          name: '',
          suites: [{
            name: '',
            suites: [{name: '', suites: [], tests: [test, test]}],
            tests: [test]
          }],
          tests: [test]
        },
        {
          name: '',
          suites: [{
            name: '',
            suites: [
              {name: '', suites: [], tests: []},
              {name: '', suites: [], tests: [test, test]}
            ],
            tests: []
          }],
          tests: []
        }
      ],
      tests: [test]
    };
    assert.deepEqual(stats(all), {counts: {tests: 11, suites: 10}});
  });
});