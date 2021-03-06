var reporter = require('../reporter').default;
var assert  = require('assert');

var deepEqual = assert.deepEqual;

module.exports = function(title,expected,actual) {		
	try {
	
		deepEqual(actual, expected);
		reporter.ok(title);
	
	} 
	catch (err) {
		if(err instanceof assert.AssertionError) {
			var expectedText = 'Expected: ' + JSON.stringify(expected);
			var actualText = 'but was: ' + JSON.stringify(actual);
			reporter.fail(title,expectedText,actualText);
		}
	}
};

