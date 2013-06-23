(function avoid_caching() {
	delete require.cache[module.id];
})();


var _load = function (calling_module) { 
	var _when = require('./when');
	_when.calling_module = calling_module;
	return _when;
}
module.exports = {
	load: _load
};

