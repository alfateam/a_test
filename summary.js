var red = '\u001b[31m',
green = '\u001b[32m',
reset = '\u001b[0m';

function summary(suites, passed, failed, failures) {
	console.log("\n========== Summary =============\n");
	for(var i in failures) {
		console.log(" %s", i);
		console.log("%s\n------------", failures[i]);
	}
	console.log('\nsuites: %d, passed: %s%d%s, failed: %s%d%s',
		suites, green, passed, reset, red, failed, reset);
}

module.exports = summary;