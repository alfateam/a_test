var a = require('a_mock'),
	assert = require('assert'),
	test = require('../../tests/test'),
	validTestFile = 'when_someTestFile1.js',
	invalidTestFile = 'someFile2.js';

(function act() {	
	console.log('isTestFile spec');
	var sut = require('../isTestFile');

	test('it should return true for valid file', function() {
		assert.equal(sut(validTestFile),true);
	});

	test('it should return false for invalid file', function() {
		assert.equal(sut(invalidTestFile), false);
	});
})();


