import * as ts from 'typescript';

const parseTestsOutOfSourceCode = (sourceCode) => {
  const sourceFile = ts.createSourceFile(
      "fileName",
      sourceCode,
      ts.ScriptTarget.ES2020,
      true
    );
  return allSuites(sourceFile);
};

const allSuites = (sourceFile) => {
  const suites = [];
  const searchDescendants = (node, parentSuite) => {
    const children = node.getChildren(sourceFile);
    for (const child of children) {
      if (ts.isCallLikeExpression(child) && child.expression.escapedText === 'describe') {
        const newSuite = {name: child['arguments'][0].text, suites: []};
        parentSuite.push(newSuite);
        searchDescendants(child, newSuite.suites);
      } else {
        searchDescendants(child, parentSuite);
      }
    }
  };
  searchDescendants(sourceFile, suites);
  return suites;
};

export const extractTestSuites = parseTestsOutOfSourceCode;
