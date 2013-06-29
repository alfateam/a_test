#!/usr/bin/env node

var cwd = process.cwd();
var runTests = require('./runTests');

process.summary = require('../emptySummary');
runTests(cwd);
process.summary();