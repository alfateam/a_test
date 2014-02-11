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
var title = 'title';
var test_invoker = {
	test: function() {}
};

expect_require('./test_invoker').return (test_invoker);

(function() {

	console.log('when called it()');

	var it = require('../it').it();
	test('it should return object containing assertFail function', function() {
		assert(typeof it.assertFail == 'function');
	});

	test('it should return object containing assertOk function', function() {
		assert(typeof it.assertOk == 'function');
	});

	test('it should return object containing assert function', function() {
		assert(typeof it.assert == 'function');
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

	test('assertFail should return object containing "it" function', function() {
		var retval = it.assertFail();
		assert(typeof retval.it == 'function');
	});

	test('assertFail should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertFail();
		assert(invoked);
	});

	test('assertOk should return object containing "it" function', function() {
		var retval = it.assertOk();
		assert(typeof retval.it == 'function');
	});

	test('assertOk should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertOk();
		assert(invoked);
	});

	test('assert should return object containing "it" function', function() {
		var retval = it.assert();
		assert(typeof retval.it == 'function');
	});

	test('assert should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assert();
		assert(invoked);
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

	test('assertThrows should return object containing "it" function', function() {
		var retval = it.assertThrows();
		assert(typeof retval.it == 'function');

	});

	test('assertThrows should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertThrows();
		assert(invoked);
	});

	test('assertDoesNotThrow should return object containing "it" function', function() {
		var retval = it.assertDoesNotThrow();
		assert(typeof retval.it == 'function');
	});

	test('assertDoesNotThrow should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertDoesNotThrow();
		assert(invoked);
	});

})();

