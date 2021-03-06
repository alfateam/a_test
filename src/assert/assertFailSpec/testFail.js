var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, value = {};

console.log('when executed');

reporter.fail = mock();
reporter.fail.expect(title).return();

var sut = require('../assertFail');
sut(title);


test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

