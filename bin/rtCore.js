var dir;
if (process.argv.length > 2)
    dir = process.argv[2];
else
    dir = process.cwd();

var runTests = require('./runTests');
process.summary = require('../emptySummary');
runTests(dir);
process.summary();
