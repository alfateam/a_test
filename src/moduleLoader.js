import path from 'path';

export default class ModuleLoader {

    load(modulePath) {
        modulePath = path.resolve(modulePath);
        
        let loadedModule = require(modulePath);
        loadedModule = loadedModule.default || loadedModule;
        loadedModule.path = modulePath;

        return loadedModule;
    }
}
