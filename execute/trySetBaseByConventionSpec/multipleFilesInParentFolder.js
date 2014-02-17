var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var isSpecFolder = requireMock('./isSpecFolder');
var getActFiles = requireMock('./getActFiles');
var sut = require('../trySetBaseByConvention');


(function() {

	console.log('when base act is missing single file in parent folder');

	var act = {};
	var baseAct = {};
	var parentFolder = 'c:/devel/xSpec';	
	var expectedBase = 'doNotChangeMe';
	var actFilename = 'c:/devel/xSpec/xyz/fooAct.js';
	act.filename = actFilename;	
	
	isSpecFolder.expect('c:/devel/xSpec/xyz').return(false);

	fs.existsSync = mock();
	fs.existsSync.expect('c:/devel/xSpec/xyz.js').return(false);
	
	getActFiles.expect(parentFolder).return(['otherFile.js','new.js']);
	try {
		sut(act);	
	}
	catch(e) {}
	

	test('it does not set base ', function() {
		assert.ok(!act.base);
	});
})();