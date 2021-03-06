var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, block = function(){ throw 'testError'; };
var expectedText = 'Expected not to throw';
var actualText = 'but threw: testError';

console.log('when throws');

reporter.fail = mock();
reporter.fail.expect(title,expectedText, actualText).return();

var sut = require('../assertDoesNotThrow');
sut(title,block);

test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

