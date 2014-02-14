var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var sut = require('../trySetBaseByConvention');


(function() {

	console.log('when base act is missing and parentFolder and parentFile mathes');

	var act = {};
	var baseAct = {};
	var parentFolder = 'c:/devel/xSpec';
	var parentFile = 'new.js';
	var expectedBase = '../new.js';
	var actFilename = 'c:/devel/xSpec/new/fooAct.js';
	act.filename = actFilename;	
	
	fs.isFile = mock();
	fs.isFile.expect('c:/devel/xSpec/new.js').return(true);
	fs.isFile.expect('c:/devel/xSpec/blaFile.js').return(true);
	fs.isFile.expect('c:/devel/xSpec/someDir').return(false);

	fs.readdirSync = mock();
	fs.readdirSync.expect(parentFolder).return(['blaFile.js',parentFile,'new']);
	sut(act);

	test('it sets base to shallow parent filename', function() {
		assert.equal(act.base,expectedBase);
	});
})();