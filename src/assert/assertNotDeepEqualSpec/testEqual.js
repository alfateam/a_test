var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = {foo: 1, a: {bar : 'baz'}}, actual = {foo: 1, a: {bar : 'baz'}};
var expectedTxt = 'Expected not equal: ' + JSON.stringify(expected);

reporter.fail = mock();
reporter.fail.expect(title,expectedTxt).return();

console.log('when equal');

var sut = require('../assertNotDeepEqual');
sut(title,expected,actual);


test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

