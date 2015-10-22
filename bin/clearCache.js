var reset = require('a_mock').expectRequire.reset;

function clearCache() {
	for(var prop in require.cache) {
		if(!prop.match(/\.node$/))
			delete require.cache[prop];
	}
	if (reset)
		reset();
}

module.exports = clearCache;