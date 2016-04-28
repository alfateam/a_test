import test from './test';
import assert from 'assert';
import Runner from '../dist/runner';
import path from 'path';
import { TestLoader } from './fakes'

(() => {
    let specsDir = path.join(__dirname, './integrationSpec');

    test('finds and runs test files in given dir recursively', () => {
        let expectedTestPaths = [
            path.join(specsDir, './whenAsyncFoo.js'),
            path.join(specsDir, './when_foo.js'),
            path.join(specsDir, './subDir/whenBaz.js')
        ];
        let testLoader = new TestLoader();
        let runner = new Runner(testLoader);
        runner.run(specsDir);
        assert.deepEqual(expectedTestPaths, testLoader.loadedPaths)
    })

})();