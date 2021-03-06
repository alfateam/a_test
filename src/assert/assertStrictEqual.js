var reporter = require('../reporter').default;
var assert  = require('assert');

var strictEqual = assert.strictEqual;

module.exports = function(title,expected,actual) {

	try {
	
		strictEqual(actual, expected);
		reporter.ok(title);
	
	} 
	catch (err) {
		if(err instanceof assert.AssertionError) {
			var expectedText = 'Expected: ' + JSON.stringify(expected);
			var actualText = 'but was: ' + JSON.stringify(actual);
			reporter.fail(title,expectedText,actualText)
		}
	}
};

