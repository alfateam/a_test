var assert = require('assert');
var test = require('./test');

var mock = require('a_mock').mock;
var requireMock = require('a_mock').requireMock;
var sut = require('../act_path_by_convention');
var path = requireMock('path');


(function() {

	console.log('when act_path is not defined');
	
	var calling_module_basename = 'when_foo';
	var calling_module_filename = '/a/b/c/' + calling_module_basename;
	
	
	var calling_module  = {
		filename : calling_module_filename
	}

	path.basename = mock();
	path.basename.expect(calling_module_filename).return(calling_module_basename);
	
	var returned = sut(calling_module);

	test('it should return original act_path', function() {
		assert.strictEqual(returned, 'foo');
	});
})();