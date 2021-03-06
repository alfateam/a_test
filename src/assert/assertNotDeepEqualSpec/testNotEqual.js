var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, expected = {foo: 1, a: {bar : {}}}, actual = {foo: 2, a:{bar : {}}};
console.log('when not equal');

reporter.ok = mock();
reporter.ok.expect(title).return();

var sut = require('../assertNotDeepEqual');
sut(title,expected,actual);


test('it should report ok', function() {
	assert.doesNotThrow(reporter.ok.verify);
});

