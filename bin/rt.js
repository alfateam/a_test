#!/usr/bin/env node

var dir;
if (process.argv.length > 2)
	dir = process.argv[2];
else
	dir = process.cwd();
var runTests = require('./runTests');
var getExitCode = require('./getExitCode');

process.summary = require('../emptySummary');
runTests(dir);
process.summary();
var exitCode = getExitCode(process.summary);
process.exit(exitCode);
