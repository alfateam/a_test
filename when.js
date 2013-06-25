var reporter = require('./reporter');

(function delete_cache_except_reporter() {
	Object.keys(require.cache).forEach(onDelete);

	function onDelete(key) {
		var cached = require.cache[key];
		if (!(cached.exports === reporter)) 
			delete require.cache[key];
	}
})();

var assert = require('assert');
var it = require('./it').it;
var suite_name_builder = require('./suite_name_builder');
var execute_act = require('./execute_act');
var load_act = require('./load_act');
var act_path_by_convention = require('./act_path_by_convention');
function when(act, c) {
	
	if(arguments.length == 1) {
		c = arguments[0];
		act = act_path_by_convention(when.calling_module);
	}

	
	act = load_act(when.calling_module, act);

	var suite_name = suite_name_builder(act);
	reporter.suite(suite_name);

	execute_act(act, c);

	return {
		it: it
	};
}

when.summary = reporter.summary;
module.exports = when;

