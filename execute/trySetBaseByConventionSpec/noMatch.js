var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var isSpecFolder = requireMock('./isSpecFolder');
var getActFiles = requireMock('./getActFiles');
var sut = require('../trySetBaseByConvention');


(function() {

	console.log('when base act is missing single file in grandParent folder');

	var act = {};
	var baseAct = {};
	var grandParentFolder = 'c:/devel/xSpec';
	var parentFolder = 'c:/devel/xSpec/xyz';
	var parentFile = 'new.js';	
	var actFilename = 'c:/devel/xSpec/xyz/bar/fooAct.js';
	act.filename = actFilename;	
	
	fs.existsSync = mock();
	fs.isFile = mock();

	isSpecFolder.expect('c:/devel/xSpec/xyz/bar').return(false);

	stubParentFolder();
	stubGrandParentFolder();
	sut(act);

	function stubParentFolder() {
		isSpecFolder.expect('c:/devel/xSpec/xyz').return(false);
		fs.existsSync.expect('c:/devel/xSpec/xyz/bar.js').return(false);		
		getActFiles.expect(parentFolder).return([]);
	}

	function stubGrandParentFolder() {				
		isSpecFolder.expect('c:/devel/xSpec').return(true);
		getActFiles.expect(grandParentFolder).return([]);
	}

	test('it does not set base', function() {
		assert.ok(!act.base);
	});
})();