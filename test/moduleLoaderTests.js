import test from './test';
import assert from 'assert';
import ModuleLoader from '../dist/moduleLoader';
import path from 'path';

(() => {
    let sut = new ModuleLoader();

    test('loads module and sets path property on loaded object', () => {
        let modulePath = './fakes',
            expectedModulePathValue = path.resolve(path.join(__dirname, modulePath));

        let loadedModule = sut.load(path.join(__dirname, modulePath));

        assert.ok(loadedModule);
        assert.strictEqual(loadedModule.path, expectedModulePathValue);
    });

    test('is able to load module that has a default function export', () => {
        let modulePath = './exportsDefaultFunction';

        let loadedValue = sut.load(path.join(__dirname, modulePath));

        assert.strictEqual('function', typeof loadedValue);
    });
})();
