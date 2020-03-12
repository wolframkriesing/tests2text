import assert from 'assert';
import {describe, it} from 'mocha';
import {stats} from './stats.js';

describe('Provide statistics about test suites', () => {
  it('GIVEN no test suites and no tests THEN return 0 for everything', () => {
    const noSuites = {suites: [], tests: []};
    assert.deepEqual(stats(noSuites), {counts: {tests: 0, suites: 0}});
  });
  it('GIVEN one test suite with no tests THEN return the counts: suites=1, tests=0', () => {
    const suite = {name: 'test suite', suites: [], tests: []};
    const suites = {suites: [suite], tests: []};
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 1}});
  });
  it('GIVEN one test suite containing another one THEN return the counts: suites=2, tests=0', () => {
    const suite = {
      name: 'suite',
      suites: [{name: 'suite', suites: [], tests: []}],
      tests: []
    };
    const suites = {suites: [suite], tests: []};
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 2}});
  });
  it('GIVEN two test suites containing two each THEN return the counts: suites=6, tests=0', () => {
    const aSuite = {name: 'suite', suites: [], tests: []};
    const suite = {name: 'suite', tests: [], suites: [aSuite, aSuite]};
    const suites = {suites: [suite, suite], tests: []};
    assert.deepEqual(stats(suites), {counts: {tests: 0, suites: 6}});
  });
  it('GIVEN suites multiple levels deep THEN return the right counts', () => {
    const suites = [
      {name: '', suites: [], tests: []},
      {name: '', suites: [{name: '', suites: [], tests: []}], tests: []},
      {
        name: '',
        suites: [{name: '', suites: [{name: '', suites: [], tests: []}], tests: []}],
        tests: []
      },
      {
        name: '',
        suites: [{
          name: '',
          suites: [{name: '', suites: [], tests: []}, {name: '', suites: [], tests: []}],
          tests: []
        }],
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
    const oneTest = {
      suites: [{suites: [], tests: [{name: ''}]}],
      tests: []
    };
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