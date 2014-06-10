var red = '\u001b[31m',
green = '\u001b[32m',
reset = '\u001b[0m',
yellow = '\u001b[33m';

function summary(arg) {
	console.log("\n========== Summary =============\n");
	for(var i in arg.messages) {
		console.log(" %s", arg.messages[i]);
	}

	console.log('\nsuites: %d, passed: %s%d%s, failed: %s%d%s, inconclusive: %s%d%s',
		arg.suites, green, arg.passed, reset, red, arg.failed, reset, yellow, arg.inconclusive, reset);
}

module.exports = summary;