var reporter = require('../reporter');
var assert  = require('assert');

var notStrictEqual = assert.notStrictEqual;

module.exports = function(title,expected,actual) {		
	try {
	
		notStrictEqual(actual, expected);
		reporter.ok(title);
	
	} 
	catch (err) {
		
		if(err instanceof assert.AssertionError) {
			var expectedText = 'Expected not equal: ' + JSON.stringify(expected);
			reporter.fail(title,expectedText);
		}
		
	}
};

