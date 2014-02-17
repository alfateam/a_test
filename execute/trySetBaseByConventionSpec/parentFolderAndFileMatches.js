var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var isSpecFolder = requireMock('./isSpecFolder');
var getActFiles = requireMock('./getActFiles');
var sut = require('../trySetBaseByConvention');


(function() {

	console.log('when base act is missing and parentFolder and parentFile mathes');

	var act = {};
	var baseAct = {};
	var parentFolder = 'c:/devel/xSpec';
	var expectedBase = '../new.js';
	var actFilename = 'c:/devel/xSpec/new/fooAct.js';
	act.filename = actFilename;	
	
	isSpecFolder.expect('c:/devel/xSpec/new').return(false);

	fs.existsSync = mock();
	fs.existsSync.expect('c:/devel/xSpec/new.js').return(true);
	var lstat = {};
	fs.lstatSync = mock();
	fs.lstatSync.expect('c:/devel/xSpec/new.js').return(lstat);
	lstat.isFile = mock();
	lstat.isFile.expect().return(true);
	sut(act);

	test('it sets base to relative parent filename', function() {
		assert.equal(act.base,expectedBase);
	});
})();