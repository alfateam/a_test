var reporter = require('../reporter').default;
var assert  = require('assert');

var notDeepEqual = assert.notDeepEqual;

module.exports = function(title,expected,actual) {		
	try {
	
		notDeepEqual(actual, expected);
		reporter.ok(title);
	
	} 
	catch (err) {
		if(err instanceof assert.AssertionError) {
			var expectedText = 'Expected not equal: ' + JSON.stringify(expected);
			reporter.fail(title,expectedText);
		}
		
	}
};

