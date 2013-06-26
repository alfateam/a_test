#!/usr/bin/env node

var cwd = process.cwd();
var glob = require('glob');

process.summary = require('../emptySummary');
glob(cwd + '/**/when*.js', function(err, files) {
    for(var i in files.reverse()) {
      if( files[i].indexOf('node_modules') >= 0 ) continue;
      require(files[i]);
      clearCache();
    }

    process.summary();
});

function clearCache() {
	for(var prop in require.cache) {
		delete require.cache[prop];
	}
}
