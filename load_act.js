var path = require('path');

function load(calling_module, actPathOrFn) {	
	if(typeof actPathOrFn === 'function')
		return actPathOrFn;
	var resolved_path;
	var calling_module_dirname = path.dirname(calling_module.filename);
	resolved_path = path.resolve(calling_module_dirname, actPathOrFn);
	
	var act = require(resolved_path);
	act.filename= resolved_path;
	return act;
}

module.exports = load;

