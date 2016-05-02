import path from 'path';

export default class ModuleLoader {

    load(modulePath) {
        modulePath = path.resolve(modulePath);
        let loadedModule = require(modulePath);
        loadedModule.path = modulePath;
        return loadedModule;
    }
}
