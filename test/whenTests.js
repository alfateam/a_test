import test from './test';
import assert from 'assert';
import { TestSuite } from './fakes';
import when from '../dist/when';

(() => {
    let executionResult = {},
        expectedAct = {},
        expectedContext = {},
        expectedSuiteModulePath = {},
        testSuite = new TestSuite();

    testSuite.expectedAct = expectedAct;
    testSuite.expectedContext =expectedContext;
    testSuite.expectedSuiteModulePath = expectedSuiteModulePath;
    testSuite.resultToReturn = executionResult;

    when.testSuite = testSuite;
    when.calling_module = {
        filename: expectedSuiteModulePath
    };


    test('when(act, c) returns testSuite execution result for the given act and context', () => {
        assert.strictEqual(when(expectedAct, expectedContext), executionResult);
    });

})();
