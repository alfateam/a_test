import test from './test';
import assert from 'assert';
import Result from '../dist/result';
import {
    ArrangeActChain, reporter, It
}
from './fakes';

let harness = [];

// harness.push(async () => {
//     test.head('given sync access arrangeActChain execution succeeds');
//
//     let suiteName = 'suiteName',
//         arrangeActChain = new ArrangeActChain(),
//         it = new It(),
//         err = new Error();
//
//     let sut = new Result(reporter, it);
//
//     sut.setup(suiteName, arrangeActChain);
//
//     test('it(title) reports suiteName and forwards to regularIt when chain succeeds', () => {
//         let assertion = 'assertion',
//             regularItResult = 'regularItResult';
//
//         it.expectedItTitle = assertion;
//         it.resultToReturn = regularItResult;
//         arrangeActChain.executeShouldThrow(false);
//
//         let actual = sut.it(assertion);
//         assert.strictEqual(reporter.reportedSuiteName, suiteName);
//         assert.strictEqual(actual, regularItResult);
//     });
//
//
//     test('it(title) reports inconclusive suiteName and forwards to inconclusiveIt when chain fails', () => {
//         let assertion = 'assertion',
//             inconclusiveItResult = 'inconclusiveItResult';
//
//         it.expectedItTitle = assertion;
//         it.resultToReturn = inconclusiveItResult;
//
//         arrangeActChain.executeShouldThrow(err);
//
//         let actual = sut.it(assertion);
//         assert.strictEqual(reporter.reportedInconclusiveSuiteName, suiteName);
//     	assert.strictEqual(reporter.reportedInconclusiveSuiteError, err);
//         assert.strictEqual(actual, inconclusiveItResult);
//     });
//
//
// });
//

harness.push(async() => {
    test.head('given async access');

    let suiteName = 'suiteName',
        arrangeActChain = new ArrangeActChain(),
        it = new It(),
        err = new Error();

    let sut = new Result(reporter, it);

    sut.setup(suiteName, arrangeActChain);

    test('then(...) reports suiteName and resolves with regularIt function when chain succeeds', async() => {

        let actual;
        arrangeActChain.executeShouldThrow(false);
        await sut.then(itFunc => actual = itFunc);
        assert.strictEqual(reporter.reportedSuiteName, suiteName);
        assert.strictEqual(actual, it.regularIt);
    });

    test('then(...) reports inconclusive suiteName and resolves with inconclusiveIt function', async () => {

    	let actual;
        arrangeActChain.executeShouldThrow(err);

    	await sut.then(itFunc => actual = itFunc);
    	assert.strictEqual(reporter.reportedInconclusiveSuiteName, suiteName);
    	assert.strictEqual(reporter.reportedInconclusiveSuiteError, err);
    	assert.strictEqual(actual, it.inconclusiveIt);
    });

    test('then(...) reports not runnable suite', async () => {

        arrangeActChain.executeShouldThrow(false);
        let thrownError = null;
        try {
    	   await sut.then(itFunc => {throw err});
        } catch(e) {
           thrownError = e;
        }
        assert.ok(thrownError === null);
    	assert.strictEqual(reporter.reportedNotRunnableSuiteName, suiteName);
    	assert.strictEqual(reporter.reportedNotRunnableSuiteError, err);
    });


});

test.runHarness(harness);
