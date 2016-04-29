#!/usr/bin/env node

import Runner from '../runner';
import reporter from '../reporter';
import path from 'path';

reporter.ensureStatsInitialized();

process.on('exit', function() {
    reporter.summary();
});


let dir;
if (process.argv.length > 2)
    dir = path.resolve(process.argv[2]);
else
    dir = process.cwd();


let runner = new Runner();
runner.run(dir);
