var assert = require('assert');
var test = require('../../test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var fs = requireMock('fs');
var sut = require('../trySetBaseByConvention');

(function() {

	console.log('when base act already set');	

	var act = {};
	var baseAct = {};
	act.base = baseAct;
	sut(act);

	test('it leaves base act unchanged', function() {
		assert.strictEqual(act.base,baseAct);
	});

})();
