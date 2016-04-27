import BaseActLoader from './baseActLoader';

export default class ActListLoader {

    constructor(baseActLoader = new BaseActLoader()) {
        this._baseActLoader = baseActLoader;
    }

    load(lastAct, suiteModulePath) {
        let result = [];
        let actFunc = this._baseActLoader.loadForSuite(lastAct, suiteModulePath);

        while (actFunc) {
            result.unshift(actFunc);
            actFunc = this._baseActLoader.loadForAct(actFunc);
        }

        return result;
    }
}
