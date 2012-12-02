(function avoid_caching_when_module() {
	delete require.cache[module.id];
	delete require.cache[require.resolve('./when')];
})();

module.exports = {
	when: require('./when')
};

