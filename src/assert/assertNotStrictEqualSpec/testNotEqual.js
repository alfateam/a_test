var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = {}, actual = {};

reporter.ok = mock();
reporter.ok.expect(title).return();

var sut = require('../assertNotStrictEqual');
sut(title,expected,actual);

console.log('when not equal');

test('it should report ok', function() {
	assert.doesNotThrow(reporter.ok.verify);
});

