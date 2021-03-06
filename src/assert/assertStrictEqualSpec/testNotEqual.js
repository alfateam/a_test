var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = {}, actual = {};

var expectedTxt = 'Expected: ' + JSON.stringify(expected);
var actualTxt = 'but was: ' + JSON.stringify(actual);

reporter.ok = mock();
reporter.fail = mock();
reporter.fail.expect(title,expectedTxt,actualTxt).return();

var sut = require('../assertStrictEqual');
sut(title,expected,actual);

console.log('when not equal');

test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

