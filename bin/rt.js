#!/usr/bin/env node

require('./rtCore');
var yellow = '\u001b[33m';
var reset = '\u001b[0m';

console.log('\n%s"when" is deprecated, use "a" instead.%s', yellow, reset);
var getExitCode = require('./getExitCode');
var exitCode = getExitCode(process.summary);
process.exit(exitCode);
