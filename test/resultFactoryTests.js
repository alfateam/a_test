import test from './test';
import assert from 'assert';
import ResultFactory from '../dist/resultFactory';

(() => {

    let sut = new ResultFactory();
    let suiteName = 'suiteName',
        arrangeActChain = 'arrangeActChain';

    test('returns initialized result', () => {
    	let actual = sut.create(suiteName, arrangeActChain);

    	assert.ok(actual);
    	assert.strictEqual(actual.suiteName, suiteName);
    	assert.strictEqual(actual.arrangeActChain, arrangeActChain);
    });

})();