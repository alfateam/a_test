var summary = require('./summary');
var suites = 0,
passed = 0,
failed = 0,
failures = [];

function emptySummary() {
	return summary(suites, passed, failed, failures);
}

module.exports = emptySummary;