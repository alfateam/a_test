var red = '\u001b[31m',
green = '\u001b[32m',
reset = '\u001b[0m',
yellow = '\u001b[33m';

function summary(arg) {
	console.log("\n========== Summary =============\n");
	for(var i in arg.failures) {
		console.log(" %s", i);
		console.log("%s\n------------", arg.failures[i]);
	}

	for(var j in arg.inconclusive_suites) {
		console.log(" %s", j);
		console.log("%s\n------------", arg.inconclusive_suites[j]);
	}
	
	console.log('\nsuites: %d, passed: %s%d%s, failed: %s%d%s, inconclusive: %s%d%s',
		arg.suites, green, arg.passed, reset, red, arg.failed, reset, yellow, arg.inconclusive, reset);
}

module.exports = summary;