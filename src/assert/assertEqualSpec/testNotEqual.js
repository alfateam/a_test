var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = 'expected', actual = 'actual';
var expectedTxt = 'Expected: expected'
var actualTxt = 'but was: actual'
console.log('when not equal');

reporter.fail = mock();
reporter.fail.expect(title,expectedTxt,actualTxt).return();

var sut = require('../assertEqual');
sut(title,expected,actual);


test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

