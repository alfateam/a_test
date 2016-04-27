import test from './test';
import assert from 'assert';
import FsHelper from '../dist/fsHelper';
import {fs, path} from './fakes';

(() => {
	let sut = new FsHelper();

    test('getRelevantDirs returns full paths to dirs up to specs top dir', () => {
        let modulePath = '/foo/bar/fooBarSpecs/a/b/c/baz.js';
        let expected = [
            '/foo/bar/fooBarSpecs/a/b/c',
            '/foo/bar/fooBarSpecs/a/b',
            '/foo/bar/fooBarSpecs/a',
            '/foo/bar/fooBarSpecs'
        ];
        let actual = sut.getRelevantDirs(modulePath);
        assert.deepEqual(actual, expected);
    });
})();

(() => {
    let sut = new FsHelper(path, fs);

    test('getFilesInDir returns dir contents', () => {
        let dirPath = 'dirPath',
            dirContents = 'dirContents';

        fs.expectedPath = dirPath;
        fs.dirContentToReturn = dirContents;

        let actual = sut.getFilesInDir(dirPath);
        assert.strictEqual(actual, dirContents);
    });

})();

(() => {
    let sut = new FsHelper(path, fs);

    test('exists returns dir contents', () => {
        let fileToExist = 'fileToExist',
            existsValue = true;

        fs.expectedFileToExist = fileToExist;
        fs.existsValueToReturn = existsValue;

        let actual = sut.exists(fileToExist);
        assert.strictEqual(actual, existsValue);
    });

})();