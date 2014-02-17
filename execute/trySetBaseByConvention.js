var fs = require('fs');
var path = require('path');
var isSpecFolder = require('./isSpecFolder');
var getActFiles = require('./getActFiles');

function trySetBaseByConvention(act) {
	if (act.base)
		return;
	var curFolder = path.dirname(act.filename);
	tryMatchByName() || tryMatchSingleFile(curFolder);

	function tryMatchByName() {
		var expectedBase = path.basename(curFolder) + '.js';	
		var fullExpectedBase = path.join(curFolder, path.sep + '..',expectedBase);
		if (fs.existsSync(fullExpectedBase) && isFile(fullExpectedBase)) {
			act.base = '../' + expectedBase;			
			return true;
		}		
	}

	function tryMatchSingleFile(curFolder) {		
		return tryMatchSingleFileCore(curFolder,'');		
	}

	function tryMatchSingleFileCore(curFolder,relative) {		
		if (isSpecFolder(curFolder))
			return;
		var parentFolder = path.join(curFolder, path.sep + '..');
		var files = getActFiles(parentFolder);
		var candidate;
		for (var i = 0; i < files.length; i++) {						
			var file = files[i];
			var fullFile = path.join(curFolder, path.sep + '..',file);				
			if (candidate)
				return;
			candidate = relative + '..' + path.sep + file;							
		};
		if(candidate) 
			act.base = candidate;
		else
			tryMatchSingleFileCore(parentFolder,relative + '..' + path.sep);
	}	
}

function isFile(file) {
	var lstat = fs.lstatSync(file);
	return lstat.isFile();
}
module.exports = trySetBaseByConvention;

