var util = require('util');
var _summary = require('./summary');
var red = '\u001b[31m',
green = '\u001b[32m',
yellow = '\u001b[33m',
reset = '\u001b[0m',
heavy_ballot = '\u2718',
check_mark = '\u2713',
right_quote = '\u00bb';

var last_suite_name,
passed = 0,
failed = 0,
suites = 0,
failures = {};

function summary() {
	_summary(suites,passed,failed,failures);
}

function ok(testname) {
	console.log('  %s%s %s%s', green, check_mark, testname, reset);
	passed++;
}

function fail(testname, trace) {
	var msg = util.format('  %s%s %s%s', red, heavy_ballot, testname, reset);
	console.log(msg);
	failures[last_suite_name + "\n" + msg] = red + trace + reset;
	failed++;
}
function suite(suite_name) {
	last_suite_name = suite_name;
	console.log('\n %s %s\n', right_quote, suite_name);
	suites++;
}
function warn(message) {
	console.log('\n%s%s%s', yellow, message, reset);
}

process.summary = summary;

module.exports = {
	ok: ok,
	fail: fail,
	warn: warn,
	suite: suite
};

