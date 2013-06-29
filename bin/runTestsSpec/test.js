var a = require('a_mock'),
	assert = require('assert'),
	test = require('../../tests/test'),
	expectRequire = a.expectRequire,
	requireMock = a.requireMock,
	mock = a.mock,
	fs = {},	
	directory = 'c:/foo/xSpec',
	testFilePath1 = 'someTestFile1.js',
	testFilePath2 = 'someTestFile2.js',
	nodeDirectory = 'node_modules',
	otherFilePath = 'otherBar.js',
	subFolder1 = 'sub1',
	fullNodeDirectory = directory + '/' + nodeDirectory,	 
	fullSubFolder1 = directory + '/' + subFolder1,	
	subFolder2 = 'sub2',
	fullSubFolder2 = directory + '/' + subFolder2,	
	fileList = [testFilePath1,testFilePath2,otherFilePath,nodeDirectory,subFolder1,subFolder2],
	didRequireTest1,
	didRequireTest2;

expectRequire('fs').return(fs)
var isTestFile = requireMock('./isTestFile');

(function act() {	
	console.log('when running tests');
	fs.readdirSync = mock();
	fs.readdirSync.expect(directory).return(fileList);	
	fs.statSync = mock();
	stubFiles();
	expectRequire(directory + '/' + testFilePath1).whenCalled(onRequireTest1).return(null);
	expectRequire(directory + '/' + testFilePath2).whenCalled(onRequireTest2).return(null);
	runTestsInSubFolders = requireMock('./runTests');
	runTestsInSubFolders.expect(fullSubFolder1);
	runTestsInSubFolders.expect(fullSubFolder2);
	clearCache = requireMock('./clearCache');
	clearCache.expect().repeat(2);
	var sut = require('../runTests');

	sut(directory);

	test('it should require testFile1', function() {
		assert.ok(didRequireTest1);
	});

	test('it should delete cache between each test', function() {
		assert.ok(clearCache.verify());
	});

	test('it should require testFile2', function() {
		assert.ok(didRequireTest2);
	});

	test('it should run tests in subFolders', function() {
		assert.ok(runTestsInSubFolders.verify());
	});

	function onRequireTest1() {
		didRequireTest1 = true;
	}

	function onRequireTest2() {
		didRequireTest2 = true;
	}
})();

function stubFiles() {
	stubTestFile(testFilePath1);
	stubTestFile(testFilePath2);
	stubOtherFile(otherFilePath);
	stubSub(subFolder1);
	stubSub(subFolder2);
	stubSub(nodeDirectory);
}

function stubTestFile(file) {		
	expectFile(file);
	isTestFile.expect(file).return(true);
}

function expectFile(file) {
	var stat = {};
	var fullPath = directory + '/' + file;
	fs.statSync.expect(fullPath).return(stat);
	stat.isDirectory = mock();
	stat.isDirectory.expect().return(false);		
}

function stubOtherFile(file) {
	expectFile(file);
	isTestFile.expect(file).return(false);
}

function stubSub(file) {
	var stat = {};
	var fullPath = directory + '/' + file;
	fs.statSync.expect(fullPath).return(stat);
	stat.isDirectory = mock();
	stat.isDirectory.expect().return(true);
}

