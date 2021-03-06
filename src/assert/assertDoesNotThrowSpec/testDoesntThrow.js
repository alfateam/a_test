var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, block = function() {};

console.log('when does not throw');

reporter.ok = mock();
reporter.ok.expect(title).return();

var sut = require('../assertDoesNotThrow');
sut(title,block);


test('it should report ok', function() {
	assert.doesNotThrow(reporter.ok.verify);
});

