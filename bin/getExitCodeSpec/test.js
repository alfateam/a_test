var	assert = require('assert');
var	test = require('../../tests/test');

(function act() {	
	var sut = require('../getExitCode');
	var returned;

	function summary() {

	}

	function emptySummary() {

	}

	function get() {
		returned = sut(summary);
	}

	(function () {	
		console.log('failing tests');
		var failed = 2;
		summary.failed = failed;
		summary.passed = 3;
		get();
		
		test('it returns number of failing tests', function() {
			assert.equal(returned,failed);
		});		
	})();

	(function () {	
		console.log('passed number of tests is undefined');
		returned = sut(emptySummary);
		
		test('it returns zero', function() {
			assert.equal(returned,0);
		});		
	})();

})();