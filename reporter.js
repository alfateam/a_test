var util = require('util');
var _summary = require('./summary');
var red = '\u001b[31m',
green = '\u001b[32m',
yellow = '\u001b[33m',
reset = '\u001b[0m',
heavy_ballot = '\u2718',
check_mark = '\u2713',
right_quote = '\u00bb';

if ((process.summary && !process.summary.messages) || !process.summary) {
	process.summary = summary;
	summary.passed = 0;
	summary.failed = 0;
	summary.suites = 0;
	summary.inconclusive = 0;
	summary.messages = [];
}

function summary() {
	_summary(process.summary);
}

function ok(testname) {
	console.log('  %s%s %s%s', green, check_mark, testname, reset);
	process.summary.passed++;
}

function inconclusive(testname){
	console.log('  %s! %s%s', yellow, testname, reset);
	process.summary.inconclusive++;
}

function inconclusive_suite(suite_name, err){
	var errorMessage = err;

	if(err.stack){
		errorMessage = err.stack;
	}
	var msg = util.format('  %s%s%s', red, errorMessage, reset);
	console.log(msg);
	var summaryMsg = util.format("%s\n%s\n------------", suite_name, msg);
	process.summary.messages.push(summaryMsg);
}

function fail(testname) {
	
	var msg = util.format('  %s%s %s%s', red, heavy_ballot, testname, reset);
	console.log(msg);
	
	var traceLines = '';
	var lf = ''
	for(var i = 1; i < arguments.length; i++){
		traceLines += lf + '        '  + arguments[i];
		lf = '\n'
	}
	if (traceLines)
		console.log(traceLines);

	var summaryMsg = util.format("%s\n%s\n%s\n------------", process.summary.last_suite_name, msg, traceLines);
	process.summary.messages.push(summaryMsg);
	process.summary.failed++;
}
function suite(suite_name) {
	process.summary.last_suite_name = suite_name;
	console.log('\n %s', suite_name);
	process.summary.suites++;
}
function warn(message) {
	console.log('\n%s%s%s', yellow, message, reset);
}

module.exports = {
	ok: ok,
	fail: fail,
	warn: warn,
	inconclusive: inconclusive,
	inconclusive_suite: inconclusive_suite,
	suite: suite
};

