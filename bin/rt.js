#!/usr/bin/env node

var cwd = process.cwd();
var runTests = require('./runTests');
var getExitCode = require('./getExitCode');

process.summary = require('../emptySummary');
runTests(cwd);
process.summary();
var exitCode = getExitCode(process.summary);
process.exit(exitCode);
