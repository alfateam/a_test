var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, value = false;

console.log('when not ok');
var text = 'Expected truthy, but was: ' + false;
reporter.fail = mock();
reporter.fail.expect(title, text).return();

var sut = require('../assertOk');
sut(title,value);


test('it should report failed', function() {
	assert.doesNotThrow(reporter.fail.verify);
});
