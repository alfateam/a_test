var assert = require('assert');
var test = require('../../test');
var a = require('a');
var requireMock = a.requireMock;
var mock = a.mock;
var fs = requireMock('fs');
var sut = require('../getActFiles');


console.log('when getting files')
var directory = 'dir',
	whenFile = 'whenxxx.js',
	actFile = 'bar.js',
	actFile2 = 'zetawhen.js',
	otherFile = 'foo.txt',
	someDir = 's';

var expectedFiles = [actFile,actFile2];
var allFiles = [whenFile,someDir,actFile,actFile2,otherFile];

fs.readdirSync = mock();
fs.readdirSync.expect(directory).return(allFiles);

fs.isFile = mock();
fs.isFile.expect('dir/whenxxx.js').return(true);
fs.isFile.expect('dir/bar.js').return(true);
fs.isFile.expect('dir/zetawhen.js').return(true);
fs.isFile.expect('dir/foo.txt').return(true);
fs.isFile.expect('dir/s').return(false);

var returned = sut(directory);
test('it returns only act files', function() {
	assert.deepEqual(returned,expectedFiles);
	
});
