var reporter = require('../reporter').default;

module.exports = function(title,expected,actual) {		
	
	if (expected == actual) {
		var expectedText = 'Expected not equal: ' + expected;
		reporter.fail(title,expectedText)
		return;
	}
	reporter.ok(title);
};