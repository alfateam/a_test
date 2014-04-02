var clear = require('a_mock').expectRequire.clear;

function clearCache() {
	for(var prop in require.cache) {
		delete require.cache[prop];
	}
	if (clear)
		clear();
}

module.exports = clearCache;