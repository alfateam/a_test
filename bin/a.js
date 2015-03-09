#!/usr/bin/env node

require('./rtCore');
var getExitCode = require('./getExitCode');
var exitCode = getExitCode(process.summary);
process.exit(exitCode);
