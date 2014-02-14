var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var sut = require('../trySetBaseByConvention');


(function() {

	console.log('when base act is missing single file in parent folder');

	var act = {};
	var baseAct = {};
	var parentFolder = 'c:/devel/xSpec';
	var parentFile = 'new.js';
	var expectedBase = '../new.js';
	var actFilename = 'c:/devel/xSpec/xyz/fooAct.js';
	act.filename = actFilename;	
	
	fs.readdirSync = mock();
	fs.isFile = mock();
	fs.isFile.expect('c:/devel/xSpec/new.js').return(true);
	fs.isFile.expect('c:/devel/xSpec/someDir').return(false);

	fs.readdirSync.expect(parentFolder).return([parentFile,'someDir']);
	sut(act);

	test('it sets base to shallow parent filename', function() {
		assert.equal(act.base,expectedBase);
	});
})();