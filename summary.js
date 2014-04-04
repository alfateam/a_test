var red = '\u001b[31m',
green = '\u001b[32m',
reset = '\u001b[0m',
yellow = '\u001b[33m';

function summary(suites, passed, failed, failures, inconclusive) {
	console.log("\n========== Summary =============\n");
	for(var i in failures) {
		console.log(" %s", i);
		console.log("%s\n------------", failures[i]);
	}
	console.log('\nsuites: %d, passed: %s%d%s, failed: %s%d%s, inconclusive: %s%d%s',
		suites, green, passed, reset, red, failed, reset, yellow, inconclusive, reset);
}

module.exports = summary;