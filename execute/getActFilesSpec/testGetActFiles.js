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

fs.lstatSync = mock();
stubIsFile('dir/whenxxx.js',true);
stubIsFile('dir/bar.js',true);
stubIsFile('dir/zetawhen.js',true);
stubIsFile('dir/foo.txt',true);
stubIsFile('dir/s',false);

var returned = sut(directory);
test('it returns only act files', function() {
	assert.deepEqual(returned,expectedFiles);
	
});

function stubIsFile(file,retVal) {
	var lstat = {};
	fs.lstatSync.expect(file).return(lstat);
	lstat.isFile = mock();
	lstat.isFile.expect().return(true);
}
