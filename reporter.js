var util = require('util');
var _summary = require('./summary');
var red = '\u001b[31m',
green = '\u001b[32m',
yellow = '\u001b[33m',
reset = '\u001b[0m',
heavy_ballot = '\u2718',
check_mark = '\u2713',
right_quote = '\u00bb';

if ((process.summary && !process.summary.failures) || ! process.summary) {
	process.summary = summary;
	summary.passed = 0,
	summary.failed = 0,
	summary.suites = 0,
	summary.failures = {};
}

function summary() {
	_summary(process.summary.suites,process.summary.passed,process.summary.failed,process.summary.failures);
}

function ok(testname) {
	console.log('  %s%s %s%s', green, check_mark, testname, reset);
	process.summary.passed++;
}

function fail(testname, trace, trace2, etc) {
	//todo

	var msg = util.format('  %s%s %s%s', red, heavy_ballot, testname, reset);
	console.log(msg);
	
	var traceLines = '';
	var lf = ''
	for(var i = 1; i < arguments.length; i++){
		traceLines += lf + '        '  + arguments[i];
		lf = '\n'
	}
	console.log(traceLines);

	process.summary.failures[process.summary.last_suite_name + "\n" + msg] = red + traceLines + reset;
	process.summary.failed++;
}
function suite(suite_name) {
	process.summary.last_suite_name = suite_name;
	console.log('\n %s %s', right_quote, suite_name);
	process.summary.suites++;
}
function warn(message) {
	console.log('\n%s%s%s', yellow, message, reset);
}

module.exports = {
	ok: ok,
	fail: fail,
	warn: warn,
	suite: suite
};

