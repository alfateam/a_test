var fs = require('fs');
var path = require('path');

function trySetBaseByConvention(act) {
	if (act.base)
		return;

	var curFolder = path.dirname(act.filename);
	var files = fs.readdirSync(parentFolder)		
	tryMatchByName();

	function tryMatchByName() {
		var expectedBase = path.basename(curFolder) + '.js';	
		var parentFolder = path.join(curFolder, path.sep + '..');

		var candidate;
		for (var i = 0; i < files.length; i++) {
			var file = files[i];	
			var fullFile = path.join(parentFolder,file);		
			if (expectedBase === file) {
				act.base = '..' + path.sep + file;
				return true;
			}
		};
	}

}

module.exports = trySetBaseByConvention;

