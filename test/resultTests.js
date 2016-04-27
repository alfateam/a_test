import test from './test';
import assert from 'assert';
import Result from '../dist/result';
import {
    SyncArrangeActChain, AsyncArrangeActChain, Reporter, It
}
from './fakes';

let harness = [];

harness.push(async () => {
    test.head('given sync access arrangeActChain execution succeeds');

    let suiteName = 'suiteName',
        arrangeActChain = new SyncArrangeActChain(),
        it = new It(),
        err = new Error();

    let sut = new Result(reporter, it);

    sut.setup(suiteName, arrangeActChain);

    test('it(title) reports suiteName and forwards to regularIt when chain succeeds', () => {
        let assertion = 'assertion',
            regularItResult = 'regularItResult';

        it.expectedItTitle = assertion;
        it.resultToReturn = regularItResult;
        arrangeActChain.executeShouldThrow(false);

        let actual = sut.it(assertion);
        assert.strictEqual(reporter.reportedSuiteName, suiteName);
        assert.strictEqual(actual, regularItResult);
    });


    test('it(title) reports inconclusive suiteName and forwards to inconclusiveIt when chain fails', () => {
        let assertion = 'assertion',
            inconclusiveItResult = 'inconclusiveItResult';

        it.expectedItTitle = assertion;
        it.resultToReturn = inconclusiveItResult;

        arrangeActChain.executeShouldThrow(err);

        let actual = sut.it(assertion);
        assert.strictEqual(reporter.reportedInconclusiveSuiteName, suiteName);
    	assert.strictEqual(reporter.reportedError, err);
        assert.strictEqual(actual, inconclusiveItResult);
    });


});


harness.push(async() => {
    test.head('given async access');

    let suiteName = 'suiteName',
        arrangeActChain = new AsyncArrangeActChain(),
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
    	assert.strictEqual(reporter.reportedError, err);
    	assert.strictEqual(actual, it.inconclusiveIt);
    });
});



(async() => {
    for (let t of harness) {
        await t();
    }
})();