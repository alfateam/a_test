var test = require('./test');
var assert = require('assert');

var a = require('a_mock');
var requireMock = a.requireMock;
var expect_require = a.expectRequire;
var assertEqual = requireMock('./assert/assertEqual');
var assertNotEqual = requireMock('./assert/assertNotEqual');
var assertDeepEqual = requireMock('./assert/assertDeepEqual');
var assertNotDeepEqual = requireMock('./assert/assertNotDeepEqual');
var assertStrictEqual = requireMock('./assert/assertStrictEqual');
var assertNotStrictEqual = requireMock('./assert/assertNotStrictEqual');
var assertOk = requireMock('./assert/assertOk');
var assertThrows = requireMock('./assert/assertThrows');
var assertDoesNotThrow = requireMock('./assert/assertDoesNotThrow');
var assertFail = requireMock('./assert/assertFail');
var title = 'title';


(function() {

	console.log('when called it()');

	var it = require('../it').it();
	test('it should return object containing assertFail function', function() {
		assert(typeof it.assertFail == 'function');
	});

	test('it should return object containing assertOk function', function() {
		assert(typeof it.assertOk == 'function');
	});

	test('it should return object containing assertEqual function', function() {
		assert(typeof it.assertEqual == 'function');
	});

	test('it should return object containing assertNotEqual function', function() {
		assert(typeof it.assertNotEqual == 'function');
	});

	test('it should return object containing assertDeepEqual function', function() {
		assert(typeof it.assertDeepEqual == 'function');
	});

	test('it should return object containing assertNotDeepEqual function', function() {
		assert(typeof it.assertNotDeepEqual == 'function');
	});

	test('it should return object containing assertStrictEqual function', function() {
		assert(typeof it.assertStrictEqual == 'function');
	});

	test('it should return object containing assertNotStrictEqual function', function() {
		assert(typeof it.assertNotStrictEqual == 'function');
	});

	test('it should return object containing assertThrows function', function() {
		assert(typeof it.assertThrows == 'function');
	});

	test('it should return object containing assertDoesNotThrow function', function() {
		assert(typeof it.assertDoesNotThrow == 'function');
	});

})();

(function() {

	console.log('when asserted');

	var it = require('../it').it(title);

	test('assertOk should return object containing "it" and call assertOk function', function() {
		var expected = {};
		assertOk.expect(title,expected).return();
		var retval = it.assertOk(expected);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertOk.verify);
	});

	test('assert should point at it.assertOk', function() {
		
		assert.strictEqual(it.assert, it.assertOk);
	});

	test('assertEqual should return object containing "it" and call assertEqual function', function() {
		var expected = {}, actual = {};
		assertEqual.expect(title,expected,actual).return();
		var retval = it.assertEqual(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertEqual.verify);
	});

	test('assertNotEqual should return object containing "it" and call assertNotEqual function', function() {
		var expected = {}, actual = {};
		assertNotEqual.expect(title,expected,actual).return();
		var retval = it.assertNotEqual(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertNotEqual.verify);
	});

	test('assertDeepEqual should return object containing "it" and call assertDeepEqual function', function() {
		var expected = {}, actual = {};
		assertDeepEqual.expect(title,expected,actual).return();
		var retval = it.assertDeepEqual(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertDeepEqual.verify);
	});

	test('assertNotDeepEqual should return object containing "it" and call assertNotDeepEqual function', function() {
		var expected = {}, actual = {};
		assertNotDeepEqual.expect(title,expected,actual).return();
		var retval = it.assertNotDeepEqual(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertNotDeepEqual.verify);
	});

	test('assertStrictEqual should return object containing "it" and call assertStrictEqual function', function() {
		var expected = {}, actual = {};
		assertStrictEqual.expect(title,expected,actual).return();
		var retval = it.assertStrictEqual(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertStrictEqual.verify);
	});

	test('assertNotStrictEqual should return object containing "it" and call assertNotStrictEqual function', function() {
		var expected = {}, actual = {};
		assertNotStrictEqual.expect(title,expected,actual).return();
		var retval = it.assertNotStrictEqual(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertNotStrictEqual.verify);
	});

	test('assertThrows should return object containing "it" and call assertThrows function', function() {
		var expected = {}, actual = {};
		assertThrows.expect(title,expected,actual).return();
		var retval = it.assertThrows(expected,actual);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertThrows.verify);
	});

	test('assertDoesNotThrow should return object containing "it" and call assertDoesNotThrow function', function() {
		var expected = {};
		assertDoesNotThrow.expect(title,expected).return();
		var retval = it.assertDoesNotThrow(expected);
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertDoesNotThrow.verify);
	});

	test('assertFail should return object containing "it" and call assertFail function', function() {
		var expected = {};
		assertFail.expect(title).return();
		var retval = it.assertFail();
		assert(typeof retval.it == 'function');
		assert.doesNotThrow(assertFail.verify);
	});

})();

