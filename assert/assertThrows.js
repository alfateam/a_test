var reporter = require('../reporter');

var assert = require('assert');
var _throws = assert.throws;

module.exports = function(title,block,error) {		
	 try {		
	 	_throws(block, error);
	 	reporter.ok(title);	
	 } 
	 
	 catch (err) {
	 	if(err instanceof assert.AssertionError) {
	 		var expectedText = 'Expected error: ' + error;
			var actualText = 'But was: ' + err.actual;
	
	 		reporter.fail(title,expectedText, actualText);
	 	}
	 }
};