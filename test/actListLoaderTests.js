import test from './test';
import assert from 'assert';
import { BaseActLoader } from './fakes.js';
import ActListLoader from '../dist/actListLoader';

(() => {
    let lastAct = {},
        suiteModulePath = {},
        suiteBaseAct = {},
        baseAct = {};

    let baseActLoader = new BaseActLoader();

    baseActLoader.expectedLastAct = lastAct;
    baseActLoader.expectedSuiteModulePath = suiteModulePath;
    baseActLoader.suiteBaseActToReturn = suiteBaseAct;


    let sut = new ActListLoader(baseActLoader);

    test('returns list with a suite base act', () => {
    	let actual = sut.load(lastAct, suiteModulePath);
    	let expected = [suiteBaseAct];
    	assert.deepEqual(actual, expected);
    });

    test('returns list with suite base act and its base when it has one', () => {
        baseActLoader.expectedAct = suiteBaseAct;
        baseActLoader.baseActToReturn = baseAct;
		let actual = sut.load(lastAct, suiteModulePath);
    	let expected = [baseAct, suiteBaseAct];
    	assert.deepEqual(actual, expected);
    });

})();