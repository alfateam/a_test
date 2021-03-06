var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = 'foo', actual = expected;
var expectedTxt = 'Expected not equal: ' + expected;
console.log('when equal');

reporter.fail = mock();
reporter.fail.expect(title,expectedTxt).return();

var sut = require('../assertNotEqual');
sut(title,expected,actual);


test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});
