import test from './test';
import assert from 'assert';
import { ModuleLoader, Convention, path } from './fakes';
import BaseActLoader from '../dist/baseActLoader';

(() => {

    let suiteModulePath = {},
        moduleLoader = new ModuleLoader(),
        convention = new Convention();

    let sut = new BaseActLoader(moduleLoader, convention, path);

    test('loadForSuite returns the same function if lastAct is a function', () => {
        let lastAct = () => {},
            actual = sut.loadForSuite(lastAct, suiteModulePath);

        assert.strictEqual(actual, lastAct);
    });

    test('loadForSuite returns a module loaded using lastAct if its value is a string', () => {
        let lastAct = 'lastAct',
            baseActModule = {},
            baseActModulePath = {},
            suiteModuleDirname = {};

        path.expectedFilePath = suiteModulePath;
        path.dirnameToReturn = suiteModuleDirname;

        path.expectedPart1 = suiteModuleDirname
        path.expectedPart2 = lastAct;
        path.joinedPathToReturn = baseActModulePath;

        moduleLoader.expectedModulePath = baseActModulePath;
        moduleLoader.moduleToReturn = baseActModule;

        let actual = sut.loadForSuite(lastAct, suiteModulePath);
        assert.strictEqual(actual, baseActModule);
    });

    test('loadForSuite returns a module loaded by convention otherwise', () => {
        let baseActModuleByConvention = {},
            suiteBasePathByConvention = {};

        convention.expectedSuiteModulePath = suiteModulePath;
        convention.suiteBasePathToReturn = suiteBasePathByConvention;

        moduleLoader.expectedModulePath = suiteBasePathByConvention;
        moduleLoader.moduleToReturn = baseActModuleByConvention;

        let actual = sut.loadForSuite(undefined, suiteModulePath);
        assert.strictEqual(actual, baseActModuleByConvention);
    });
})();


(() => {
    let suiteModulePath = {},
        moduleLoader = new ModuleLoader(),
        convention = new Convention();

    let sut = new BaseActLoader(moduleLoader, convention, path);

    test('loadForAct loads using act.base value when specified', () => {
        let baseModuleRelativePath = 'baseModuleRelativePath',
            baseModuleFullPath = 'baseModuleFullPath',
            baseModule = 'baseModule',
            actPath = 'actPath',
            actDirname = 'actDirname',
            act = { base: baseModuleRelativePath, path: actPath };

        path.expectedFilePath = actPath;
        path.dirnameToReturn = actDirname;

        path.expectedPart1 = actDirname;
        path.expectedPart2 = baseModuleRelativePath;
        path.joinedPathToReturn = baseModuleFullPath;

        moduleLoader.expectedModulePath = baseModuleFullPath;
        moduleLoader.moduleToReturn = baseModule;

        let actual = sut.loadForAct(act);
        assert.strictEqual(actual, baseModule);
    });


    test('loadForAct loads using convention if act.base is not set', () => {
       let actPath = 'actPath',
           baseModulePathByConvention = 'baseModulePathByConvention',
           baseModuleByConvention = 'baseModuleByConvention',
           act = { path: actPath };

        convention.expectedActPath = actPath;
        convention.actBasePathToReturn = baseModulePathByConvention;

        moduleLoader.expectedModulePath = baseModulePathByConvention;
        moduleLoader.moduleToReturn = baseModuleByConvention;

        let actual = sut.loadForAct(act);
        assert.strictEqual(actual, baseModuleByConvention);
    });

    test('loadForAct returns undefined if act.base is not set and convention returns undefined', () => {
       let actPath = 'actPath',
           baseModulePathByConvention = undefined,
           baseModuleByConvention = {},
           act = { path: actPath };

        convention.expectedActPath = actPath;
        convention.actBasePathToReturn = baseModulePathByConvention;

        moduleLoader.expectedModulePath = baseModulePathByConvention;
        moduleLoader.moduleToReturn = baseModuleByConvention;

        let actual = sut.loadForAct(act);
        assert.strictEqual(actual, undefined);
    });

    test('loadForAct returns undefined if act is not defined in a dedicated file', () => {
        let act = {},
            baseModulePathByConvention = 'baseModulePathByConvention',
           baseModuleByConvention = 'baseModuleByConvention';

        convention.expectedActPath = undefined;
        convention.actBasePathToReturn = baseModulePathByConvention;

        moduleLoader.expectedModulePath = baseModulePathByConvention;
        moduleLoader.moduleToReturn = baseModuleByConvention;

        let actual = sut.loadForAct(act);
        assert.strictEqual(actual, undefined);
    });

})();
