var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var isSpecFolder = requireMock('./isSpecFolder');
var getActFiles = requireMock('./getActFiles');
var sut = require('../trySetBaseByConvention');


(function() {
	console.log('when act has no filename');

	var act = {};
	sut(act);

	test('it should do nothing', function() {
		assert.equal(true, true);
	});
})();