var reporter = require('./reporter');
var load_act = require('./load_act');
var trySetBaseByConvention = require('./execute/trySetBaseByConvention');                                      

function execute(act, c) {
	var baseExecute = require('./execute_act');
	trySetBaseByConvention(act);
	var base_act = act.base;

	if (base_act) {
		base_act = load_act(act, base_act);
		c = baseExecute(base_act, c);
	}
	act(c);

	return c;
}

module.exports = execute;