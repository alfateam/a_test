var assert = require('assert');
var test = require('../../test');
var sut = require('../isSpecFolder');


test('it returns true when lowercase', function() {
	assert.strictEqual(sut('c:/devel/foospec'),true);
});

test('it returns true when plural spec', function() {
	assert.strictEqual(sut('c:/devel/foospecs'),true);
});

test('it returns true when underscore lowercase', function() {
	assert.strictEqual(sut('c:/devel/foo_spec'),true);
});

test('it returns true when camelCase', function() {
	assert.strictEqual(sut('c:/devel/fooSpec'),true);
});

test('it returns false when contains camelcase spec but not last', function() {
	assert.strictEqual(sut('c:/devel/xSpec/foo'),false);
});

test('it returns false when contains lowerCase spec but not last', function() {
	assert.strictEqual(sut('c:/devel/spec/foo'),false);
});

test('it returns false when not contains spec', function() {
	assert.strictEqual(sut('devel/x/foo'),false);
});

