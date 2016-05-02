import ResultFactory from './resultFactory';
import ArrangeActChainFactory from './arrangeActChainFactory';
import SuiteNameBuilder from './suiteNameBuilder';

export default class TestSuite {

    constructor(suiteNameBuilder = new SuiteNameBuilder(),
        arrangeActChainFactory = new ArrangeActChainFactory(),
        resultFactory = new ResultFactory()) {

        this._suiteNameBuilder = suiteNameBuilder;
        this._arrangeActChainFactory = arrangeActChainFactory;
        this._resultFactory = resultFactory;
    }

    execute(act, context, modulePath) {
        let suiteName = this._suiteNameBuilder.build(modulePath);
        let arrangeActChain = this._arrangeActChainFactory.create(act, context, modulePath);
        return this._resultFactory.create(suiteName, arrangeActChain);
    }

}
