var assert = require('assert');
var test = require('./test');

var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var path = requireMock('path');
var reporter = requireMock('./reporter');

var load_act = require('../load_act');


(function() {
	console.log('when loaded');

	var act_path = 'act_path';
	var parent_count = 2;
	var resolved_act_path = 'resolved_act_path';
	var act = requireMock('resolved_act_path');

	var ancestor_module_filename = 'filename';
	var ancestor_module_dirname = 'dirname';

	var ancestor_module = {
		filename: ancestor_module_filename
	};

	var calling_module = {};
	var parent = {};
	calling_module.parent = parent;
	parent.parent = ancestor_module;

	path.dirname = mock();
	path.resolve = mock();

	path.dirname.expect(ancestor_module_filename).return(ancestor_module_dirname);
	path.resolve.expect(ancestor_module_dirname, act_path).return(resolved_act_path);


	var returned = load_act(calling_module, act_path, parent_count);

	test('it should load act module using given path relative to ancestor module', function() {
		assert.strictEqual(returned, act);
	});

	test('it should set filename property to resolved path', function() {
		assert(returned.filename === resolved_act_path);
	});
})();

