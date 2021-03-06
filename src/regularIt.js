var assert = require('assert');
var assertEqual = require('./assert/assertEqual');
var assertNotEqual = require('./assert/assertNotEqual');
var assertDeepEqual = require('./assert/assertDeepEqual');
var assertNotDeepEqual = require('./assert/assertNotDeepEqual');
var assertStrictEqual = require('./assert/assertStrictEqual');
var assertNotStrictEqual = require('./assert/assertNotStrictEqual');
var assertOk = require('./assert/assertOk');
var assertThrows = require('./assert/assertThrows');
var assertDoesNotThrow = require('./assert/assertDoesNotThrow');
var assertFail = require('./assert/assertFail');

function new_it() {
	return {
		it: it
	};
}
function it(title) {
	var retval = {};

	retval.assertOk = function(value) {
		assertOk(title,value);
		return new_it();
	};

	retval.assert = retval.assertOk;

	retval.assertEqual = function(expected, actual) {
		assertEqual(title,expected,actual);
		return new_it();
	};

	retval.assertNotEqual = function(expected, actual) {
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

	retval.assertThrows = function(block, error) {
		assertThrows(title,block,error);
		return new_it();
	};

	retval.assertDoesNotThrow = function(block) {
		assertDoesNotThrow(title,block);
		return new_it();
	};

	retval.assertFail = function() {
		assertFail(title);
		return new_it();
	};


	return retval;
}

module.exports = new_it();

