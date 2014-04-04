var a = require('a_mock'),
	mock = a.mock,
	requireMock = a.requireMock,
	test = require('./test'),
	assert = require('assert'),
	title = 'foo',
	reporter = requireMock('./reporter');




(function() {

    console.log('when called it()');

    var it = require('../inconclusive_it').it();
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
    console.log("when asserted");
    var it = require('../inconclusive_it').it(title);
    
    
    test('assertOk should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertOk);
    });

    test('assert should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assert);
    });

    test('assertEqual should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertEqual);
    });

    test('assertNotEqual should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertNotEqual);
    });

    test('assertDeepEqual should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertDeepEqual);
    });

    test('assertNotDeepEqual should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertNotDeepEqual);
    });

    test('assertStrictEqual should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertStrictEqual);
    });

    test('assertNotStrictEqual should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertNotStrictEqual);
    });

    test('assertThrows should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertThrows);
    });

    test('assertDoesNotThrow should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertDoesNotThrow);
    });

    test('assertFail should report inconclusive result', function() {
        checkIfReportsInconclusive(it.assertFail);
    });

    function checkIfReportsInconclusive(assertion) {
    	reporter.inconclusive = mock();
        reporter.inconclusive.expect(title);
        var retval = assertion();
        assert.doesNotThrow(reporter.inconclusive.verify);        
        assert(typeof retval.it === 'function');
    }

})();
