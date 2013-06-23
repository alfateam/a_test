var assert = require('assert');
var test = require('./test');

(function() { 
	console.log('when required index');
	var calling_module = {};
	var when = require('../index').load(calling_module);
	test('it should set calling module value on when', function() {
		assert(calling_module === when.calling_module);
	});
})();