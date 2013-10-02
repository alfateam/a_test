module.exports = function(summary) {
	var failed = summary.failed;
	if (summary.failed === undefined)
		return 0;
	return failed;
};