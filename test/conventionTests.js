import test from './test';
import assert from 'assert';
import path from 'path';
import {
    FsHelper
}
from './fakes';
import Convention from '../dist/convention';

let harness = [];

harness.push(async () => {
    test.head('getSuiteBasePath given match in the same dir');

    let fsHelper = new FsHelper();
    let sut = new Convention(fsHelper);

    test('returns /aaa/fooSpecs/a/b/c/foobar.js for /aaa/fooSpecs/a/b/c/whenFoobar.js if exists', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            baseActPath = '/aaa/fooSpecs/a/b/c/foobar.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('returns undefined if no matches are found', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenNonexistent.js';

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, undefined);
    })

});

harness.push(async() => {
    test.head('getSuiteBasePath given act matching one of its parent dirs');

    let fsHelper = new FsHelper();
    let sut = new Convention(fsHelper);

    test('returns /aaa/fooSpecs/a/b/c.js for /aaa/fooSpecs/a/b/c/whenFoobar.js if exists', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            baseActPath = '/aaa/fooSpecs/a/b/c.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('looks up dir hierarchy if doesnt find a match ', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            baseActPath = '/aaa/fooSpecs/a/b.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('does not look past top folder', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            baseActPath = '/aaa/fooSpecs.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, undefined);
    });


});

harness.push(() => {
    test.head('getSuiteBasePath given single act in one of the parent dirs');

    let fsHelper = new FsHelper();
    let sut = new Convention(fsHelper);

    test('returns /aaa/fooSpecs/a/b/foo.js for /aaa/fooSpecs/a/b/c/whenFoobar.js if it is a single act in the dir', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            matchingDir = '/aaa/fooSpecs/a/b',
            baseActPath = '/aaa/fooSpecs/a/b/foo.js';

        fsHelper.expectedDir = matchingDir;
        fsHelper.filesInDirToReturn = [
            'when_Bar.js',
            'whenFoo.js',
            'when_Foo.js',
            'foo.txt',
            'foo.js',
            'baz',
            'bazz',
        ];

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('looks up in dir hierarchy if doesnt find a match', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            matchingDir = '/aaa/fooSpecs',
            baseActPath = '/aaa/fooSpecs/req.js';

        fsHelper.expectedDir = matchingDir;
        fsHelper.filesInDirToReturn = ['baz', 'bar', 'req.js'];

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('does not look past top folder', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/whenFoobar.js',
            matchingDir = '/aaa';

        fsHelper.expectedDir = matchingDir;
        fsHelper.filesInDirToReturn = [
            'when_Bar.js',
            'whenFoo.js',
            'when_Foo.js',
            'foo.txt',
            'foo.js',
            'baz'
        ];

        let actual = sut.getSuiteBasePath(suiteFilePath);
        assert.strictEqual(actual, undefined);

    });


});


harness.push(async () => {
    test.head('getActBasePath given act matching one of its parent dirs');

    let fsHelper = new FsHelper();
    let sut = new Convention(fsHelper);

    test('returns /aaa/fooSpecs/a/b/c.js for /aaa/fooSpecs/a/b/c/foobar.js if exists', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/foobar.js',
            baseActPath = '/aaa/fooSpecs/a/b/c.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getActBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('looks up dir hierarchy if doesnt find a match ', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/foobar.js',
            baseActPath = '/aaa/fooSpecs/a/b.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getActBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('does not look past top folder', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/foobar.js',
            baseActPath = '/aaa/fooSpecs.js';

        fsHelper.expectedFilePath = baseActPath;
        fsHelper.existsValueToReturn = true;

        let actual = sut.getActBasePath(suiteFilePath);
        assert.strictEqual(actual, undefined);
    });


});

harness.push(() => {
    test.head('getActBasePath given single act in one of the parent dirs');

    let fsHelper = new FsHelper();
    let sut = new Convention(fsHelper);

    test('returns /aaa/fooSpecs/a/b/foo.js for /aaa/fooSpecs/a/b/c/foobar.js if it is a single act in the dir', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/foobar.js',
            matchingDir = '/aaa/fooSpecs/a/b',
            baseActPath = '/aaa/fooSpecs/a/b/bazz.js';

        fsHelper.expectedDir = matchingDir;
        fsHelper.filesInDirToReturn = [
            'when_Bar.js',
            'whenFoo.js',
            'when_Foo.js',
            'foo.txt',
            'bazz.js',
            'baz'
        ];

        let actual = sut.getActBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('looks up in dir hierarchy if doesnt find a match', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/foobar.js',
            matchingDir = '/aaa/fooSpecs',
            baseActPath = '/aaa/fooSpecs/req.js';

        fsHelper.expectedDir = matchingDir;
        fsHelper.filesInDirToReturn = ['baz', 'bar', 'req.js'];

        let actual = sut.getActBasePath(suiteFilePath);
        assert.strictEqual(actual, baseActPath);
    });

    test('does not look past top folder', () => {
        let suiteFilePath = '/aaa/fooSpecs/a/b/c/foobar.js',
            matchingDir = '/aaa';

        fsHelper.expectedDir = matchingDir;
        fsHelper.filesInDirToReturn = ['baz', 'bar', 'req.js'];

        let actual = sut.getActBasePath(suiteFilePath);
        assert.strictEqual(actual, undefined);

    });
});


(async () => {
    for (let t of harness) {
        await t();
    }
})();