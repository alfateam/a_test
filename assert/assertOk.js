var reporter = require('../reporter');

var assert = require('assert');
var ok = assert.ok;

module.exports = function(title,value) {		
	try {
		
		ok(value);
		reporter.ok(title);
	
	} 
	catch (err) {
		if(err instanceof assert.AssertionError) {
			var text = 'Expected truthy value, but was: ' + value;
			reporter.fail(title,text);
		}
	}
};