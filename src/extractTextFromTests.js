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
  const childNodes = node => {
    const nodes = [];
    node.forEachChild(child => {
        nodes.push(child);
        return undefined;
    });
    return nodes;
  };
  const searchDescendants = (node, parentSuite) => {
    const children = childNodes(node);
    for (const child of children) {
      if (ts.isCallLikeExpression(child)) {
        const newSuite = {name: child.arguments[0].text, suites: []};
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

export const extractTestSuites = sourceCode => {
  return parseTestsOutOfSourceCode(sourceCode);
};
