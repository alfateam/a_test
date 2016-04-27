import test from './test';
import assert from 'assert';
import { ActListLoader } from './fakes';
import ArrangeActChainFactory from '../dist/arrangeActChainFactory';



(() => {

    let lastAct = 'lastAct',
        context = 'context',
        suiteModulePath = 'suiteModulePath',
        loadedActs = 'loadedActs';

    let actListLoader = new ActListLoader();

    actListLoader.expectedSuiteModulePath = suiteModulePath;
    actListLoader.expectedLastAct = lastAct;
    actListLoader.loadedActsToReturn = loadedActs;

    let sut = new ArrangeActChainFactory(actListLoader);

    let result = sut.create(lastAct, context, suiteModulePath);

    test('it should return an instance', () => {
        assert(typeof result === 'object');
    });

    test('returned instance should be initialized with actList and context', () => {
        assert.strictEqual(loadedActs, result.actList);
        assert.strictEqual(context, result.context);
    });
})();