var reporter = require('./reporter');
var assert = require('assert');
var it = require('./it').it;
var suite_name_builder = require('./suite_name_builder');
var execute_act = require('./execute_act');
var load_act = require('./load_act');
var act_path_by_convention = require('./act_path_by_convention');

function when(act_path_or_fn, c) {
	var act;

	if(arguments.length == 1) {
		c = arguments[0];
		act_path_or_fn = act_path_by_convention(when.calling_module);
	}	

	act = load_act(when.calling_module,act_path_or_fn);

	var suite_name = suite_name_builder(when.calling_module);
	reporter.suite(suite_name);

	execute_act(act, c);

	return {
		it: it
	};
}

module.exports = when;

