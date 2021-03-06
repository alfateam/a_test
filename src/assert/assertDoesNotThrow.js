var reporter = require('../reporter').default;

var assert = require('assert');
var doesNotThrow = assert.doesNotThrow;
var trimStackTrace = require('./trimStackTrace');


module.exports = function(title,block) {		
	 try {		
	 	doesNotThrow(block);	 	
	 } 	 
	 catch (err) {
	 	var expectedText = 'Expected not to throw';
		var actualText = 'but threw: ';
		
		if(err.stack == undefined) {
			actualText += err;
		} else {
			actualText += trimStackTrace(err);
		}

	 	reporter.fail(title, expectedText, actualText);
	 	return;
	 }
	 reporter.ok(title);	
};