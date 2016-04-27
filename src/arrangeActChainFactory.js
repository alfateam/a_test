import ActListLoader from './actListLoader';
import ArrangeActChain from './arrangeActChain'

export default class ArrangeActChainFactory {

	constructor(actListLoader = new ActListLoader()) {
		this._actListLoader = actListLoader;
	}

    create(lastAct, context, suiteModulePath) {

    	let loadedActs = this._actListLoader.load(lastAct, suiteModulePath);

    	let chain = new ArrangeActChain();
    	chain.setup(loadedActs, context);
    	return chain;
    }

}
