var requireMock = require('a_mock').requireMock;
var test = require('./test');
var assert = require('assert');
var summary = requireMock('./summary');
var sut = require('../emptySummary');
var expected = {};

console.log('emptySummary');

(function() {
	console.log('exeute');
	summary.expect(0).expect(0).expect(0).expectArray([]).return(expected); 

	function onSummary(suites, passed, failed, failures) {
		if (failures.length > 0)
			throw new Error('failures was not empty');
	}

	var returned = sut();
	
	test('it should forward to summary', function() {
		assert.equal(returned, expected);
	});
})();
