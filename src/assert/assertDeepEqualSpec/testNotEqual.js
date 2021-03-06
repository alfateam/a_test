var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = {foo: 1, a: {bar : {}}}, actual = {foo: 2, a:{bar : {}}};
var expectedTxt = 'Expected: ' + JSON.stringify(expected);
var actualTxt = 'but was: ' + JSON.stringify(actual);
console.log('when not equal');

reporter.ok = mock();
reporter.fail = mock();
reporter.fail.expect(title,expectedTxt,actualTxt).return();

var sut = require('../assertDeepEqual');
sut(title,expected,actual);


test('it should report fail', function() {
	assert.doesNotThrow(reporter.fail.verify);
});

