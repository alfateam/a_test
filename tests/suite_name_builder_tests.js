var test = require('./test');
var assert = require('assert');
var sut = require('../suite_name_builder');

function act(c) {}
var returned;



(function() {

	act.filename = '/path/spec/givenA/givenB/when_act.js';
	returned = sut(act);

	console.log('when building with when_');
	test('returns folder names separated with right_quotes up to spec folder', function() {
		assert.equal(returned,'spec » givenA » givenB » act');
	});

	act.filename = '\\path\\spec\\givenA\\givenB\\act.js';
	returned = sut(act);

	console.log('when building on windows with _when');
	test('returns folder names separated with right_quotes up to spec folder', function() {
		assert.equal(returned,'spec » givenA » givenB » act');
	});

	act.filename = '/path/spec/specGivenA/givenB/whenAct.js';
	returned = sut(act);

	console.log('when building with when');
	test('returns folder names separated with right_quotes up to spec folder', function() {
		assert.equal(returned,'spec » specGivenA » givenB » act');
	});

	act.filename = '/path/specs/givenA/givenB/whenAct.js';
	returned = sut(act);

	console.log('when building with when and specs');
	test('returns folder names separated with right_quotes up to specs folder', function() {
		assert.equal(returned,'specs » givenA » givenB » act');
	});

})();

