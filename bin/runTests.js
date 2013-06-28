var fs  = require('fs');
var isTestFile = require('./isTestFile');

function run(directory) {
	var files = fs.readdirSync(directory);	
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var fullPath = directory + '/' + file;
		var stat = fs.statSync(fullPath);
		if (stat.isDirectory() === false && isTestFile(file))
			require(fullPath);
		//todo run tests in subfolders
		//todo clear cache between each.
		//todo impl isTestFile
	};
}



module.exports = run;