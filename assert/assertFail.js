var reporter = require('../reporter');

var assert = require('assert');
var fail = assert.fail;

module.exports = function(title) {		
	reporter.fail(title);
};