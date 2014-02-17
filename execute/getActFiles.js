var fs = require('fs');
var path = require('path');

module.exports = function getActFiles(folder) {
	var files = fs.readdirSync(folder);
	var result = [];
	for (var i = 0; i < files.length; i++) {
		var file = files[i];				
		if (isJs() && notWhen() && isFile())
			result.push(file)
	};
	return result;	

	function isJs () {
		return file.indexOf('.js', file.length - 3) !== -1;
	}

	function notWhen() {		
		return file.toLowerCase().substring(0,4) !== 'when';
	}

	function isFile() {
		var fullFile = path.join(folder,path.sep,file);
		return fs.isFile(fullFile);
	}
}


