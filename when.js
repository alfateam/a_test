(function avoid_caching() {
	delete require.cache[module.id];
})();

var assert = require('assert');
var it = require('./it').it;
var suite_name_builder = require('./suite_name_builder');
var execute_act = require('./execute_act');
var load_act = require('./load_act');
var reporter = require('./reporter');
var act_path_by_convention = require('./act_path_by_convention');
function when(act, c) {
	
	if(arguments.length == 1) {
		c = arguments[0];
		act = act_path_by_convention(module.parent);
	}

	
	act = load_act(module.parent, act, when.parentCount);

	var suite_name = suite_name_builder(act);
	reporter.suite(suite_name);

	execute_act(act, c);

	return {
		it: it
	};
}
when.parentCount = 0;
when.summary = reporter.summary;
module.exports = when;

