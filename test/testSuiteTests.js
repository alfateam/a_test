import test from './test';
import assert from 'assert';
import TestSuite from '../dist/testSuite';

import { SuiteNameBuilder, ArrangeActChainFactory, ResultFactory } from './fakes';

(() => {
    let suiteNameBuilder = new SuiteNameBuilder(),
        arrangeActFactory = new ArrangeActChainFactory(),
        resultFactory = new ResultFactory(),
        act = 'act',
        context = 'context',
        suitePath = 'suitePath',
        suiteName = 'suiteName',
        arrangeActChain = 'arrangeActChain',
        arrangeActResult = 'arrangeActResult';


    suiteNameBuilder.expectedSuitePath = suitePath;
    suiteNameBuilder.suiteNameToReturn = suiteName;

    arrangeActFactory.expectedAct = act;
    arrangeActFactory.expectedContext = context;
    arrangeActFactory.expectedSuitePath = suitePath;
    arrangeActFactory.arrangeActChainToReturn = arrangeActChain;

    resultFactory.expectedArrangeActChain = arrangeActChain;
    resultFactory.expectedSuiteName = suiteName;
    resultFactory.resultToReturn = arrangeActResult;

    let sut = new TestSuite(suiteNameBuilder, arrangeActFactory, resultFactory);

    let actual = sut.execute(act, context, suitePath);


    test('execute returns result of arrange and act execution', () => {
        assert.strictEqual(actual, arrangeActResult);
    });
})();