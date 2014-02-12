var reporter = require('../reporter');

var assert = require('assert');
var doesNotThrow = assert.doesNotThrow;

module.exports = function(title,block) {		
	 try {		
	 	doesNotThrow(block);
	 	reporter.ok(title);	
	 } 
	 
	 catch (err) {
	 	var expectedText = 'Expected not to throw';
		var actualText = 'But threw: ';
		
		if(err.stack == undefined) {
			actualText += err;
		} else {
			actualText += err.stack;
		}

	 	reporter.fail(title, expectedText, actualText);
	 }
};