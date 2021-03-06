var test = require('../../test');
var assert = require('assert');
var a = require('a_mock')
var requireMock = a.requireMock;
var mock = a.mock;
var reporter = requireMock('../reporter');

var title = {}, block = function(){ throw 'error'; }, error = 'error';

console.log('when throws');

reporter.ok = mock();
reporter.ok.expect(title).return();

var sut = require('../assertThrows');
sut(title,block,error);


test('it should report ok', function() {
	assert.doesNotThrow(reporter.ok.verify);
});

