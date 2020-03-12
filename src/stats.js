const countSuites = (suites) => {
  const reducer = (count, suite) => {
    const childSuites = suite.suites ? suite.suites : [];
    return count + countSuites(childSuites);
  };
  const childrenCount = suites.reduce(reducer, 0);
  return childrenCount + suites.length;
};
const countTestsInSuites = (suites) =>
  suites.reduce(
    (count, suite) => {
      const countInChildSuites = countTestsInSuites(suite.suites);
      return count + suite.tests.length + countInChildSuites;
    }, 0
  );
const countTests = (all) => countTestsInSuites(all.suites) + all.tests.length;
export const stats = (all) => {
  const {suites} = all;
  const testsCount = countTests(all);
  const suitesCount = countSuites(suites);
  return {counts: {tests: testsCount, suites: suitesCount}};
};
