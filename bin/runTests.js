var fs  = require('fs');
var isTestFile = require('./isTestFile');
var runSubFolder = runSubFolderFirstTime;
var clearCache = require('./clearCache');

function run(directory) {
	var files = fs.readdirSync(directory);	
	var subFolders = [];
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var fullPath = directory + '/' + file;
		if (isDirectory(fullPath))
			subFolders.push({fullPath:fullPath , file:file});
		else if (isTestFile(file)) {
			require(fullPath);
			clearCache();
		}
	};
	runSubFolders(subFolders);
}

function runSubFolders(subFolders) {
	for (var i = 0; i < subFolders.length; i++) {
		var entry = subFolders[i];
		tryRunSubFolder(entry.fullPath,entry.file);
	};
}

function isDirectory(path) {
	var stat = fs.statSync(path);
	return stat.isDirectory();
}

function runSubFolderFirstTime(folder) {
	runSubFolder = require('./runTests');
	runSubFolder(folder);
}

function tryRunSubFolder(fullPath,folder) {
	if (folder === 'node_modules') 
		return;
	runSubFolder(fullPath);
}

module.exports = run;