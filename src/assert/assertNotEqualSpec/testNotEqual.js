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

reporter.ok = mock();
reporter.ok.expect(title).return();

var sut = require('../assertNotEqual');
sut(title,expected,actual);


test('it should report ok', function() {
	assert.doesNotThrow(reporter.ok.verify);
});



