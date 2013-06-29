function clearCache() {
	for(var prop in require.cache) {
		delete require.cache[prop];
	}
}

module.exports = clearCache;