import ModuleLoader from './moduleLoader';
import Convention from './convention';
import realPath from 'path';

export default class BaseActLoader {
    constructor(moduleLoader = new ModuleLoader(),
        convention = new Convention(),
        path = realPath) {
        this._moduleLoader = moduleLoader;
        this._convention = convention;
        this._path = path;
    }

    loadForSuite(lastAct, suiteModulePath) {
        let lastActType = typeof lastAct;
        if (lastActType === 'function') {
            return lastAct;

        } else if (lastActType === 'string') {

            let joinPath = this._path.join,
                dirname = this._path.dirname;

            let baseActPath = joinPath(dirname(suiteModulePath), lastAct);

            return this._moduleLoader.load(baseActPath);

        } else {

            let baseActPath = this._convention.getSuiteBasePath(suiteModulePath);

            return this._moduleLoader.load(baseActPath);
        }
    }


    loadForAct(act) {
        if (act.base) {
            let joinPath = this._path.join,
                dirname = this._path.dirname;

            let baseActPath = joinPath(dirname(act.path), act.base);

            return this._moduleLoader.load(baseActPath);

        } else if (!this._isDefinedInOwnFile(act)) {
            return undefined;
        } else {
            let baseActPath = this._convention.getActBasePath(act.path);
            if (baseActPath) //FIXME not tested
                return this._moduleLoader.load(baseActPath);
        }
    }

    _isDefinedInOwnFile(act) {
        return !!act.path;
    }
}
