var assert = require('assert');
var assertEqual = require('./assert/assertEqual');
var assertNotEqual = require('./assert/assertNotEqual');
var assertDeepEqual = require('./assert/assertDeepEqual');
var assertNotDeepEqual = require('./assert/assertNotDeepEqual');
var assertStrictEqual = require('./assert/assertStrictEqual');
var assertNotStrictEqual = require('./assert/assertNotStrictEqual');
var x = require('./test_invoker');

function new_it() {
	return {
		it: it
	};
}
function it(title) {
	var retval = {};

	retval.assertFail = function(message) {
		x.test(title, function() {
			assert.fail(null, null, message);
		});
		return new_it();
	};

	retval.assertOk = function(value, message) {
		x.test(title, function() {
			assert.ok(value, message);
		});
		return new_it();
	};

	retval.assert = function(value, message) {
		x.test(title, function() {
			assert(value, message);
		});
		return new_it();
	};

	retval.assertEqual = function(expected, actual) {
		assertEqual(title,expected,actual);
		return new_it();
	};

	retval.assertNotEqual = function(expected, actual, message) {
		assertNotEqual(title,expected,actual);
		return new_it();
	};

	retval.assertDeepEqual = function(expected, actual) {
		assertDeepEqual(title,expected,actual);
		return new_it();
	};

	retval.assertNotDeepEqual = function(expected, actual) {
		assertNotDeepEqual(title,expected,actual);
		return new_it();
	};

	retval.assertStrictEqual = function(expected, actual) {
		assertStrictEqual(title,expected,actual);
		return new_it();
	};

	retval.assertNotStrictEqual = function(expected, actual) {
		assertNotStrictEqual(title,expected,actual);
		return new_it();
	};


	retval.assertThrows = function(block, error, message) {
		x.test(title, function() {
			assert.throws(block, error, message);
		});
		return new_it();
	};

	retval.assertDoesNotThrow = function(block, message) {
		x.test(title, function() {
			assert.doesNotThrow(block, message);
		});
		return new_it();
	};

	return retval;
}

module.exports = new_it();

