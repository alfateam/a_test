var reporter = require('../reporter').default;

var assert = require('assert');
var trimStackTrace = require('./trimStackTrace');
var _throws = assert.throws;

module.exports = function(title,block,error) {
	 try {		
	 	_throws(block, error);	 	
	 } 	 
	 catch (err) {	 		 	
	 		var expectedText = 'Expected error: ' + error;			
	 		var actualText;	
			if(err instanceof assert.AssertionError) {
				setActualText(err.actual);			
			}
			else 
				setActualText(err);						
	 		reporter.fail(title,expectedText, actualText);
	 		return;
	 }
	 reporter.ok(title);	

	 function setActualText(err) {
	 		if (!err) {
	 			actualText = 'but none was thrown';
	 			return;	 			
	 		}	 		
	 		actualText = 'but was: '
			if(err.stack == undefined) 
				actualText += err;
			else 
				actualText += trimStackTrace(err);			
	 }
};
