var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, block = function() {}, error = '';

console.log('when does not throw');
var expectedText = 'Expected error: ' + error;
var actualText = 'But was: ' + undefined;
reporter.fail = mock();
reporter.fail.expect(title, expectedText).expectAnything().return();

var sut = require('../assertThrows');
sut(title,block,error);


test('it should report failed', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

