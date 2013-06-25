var path = require('path');

function getPath(calling_module) {
	var baseName = path.basename(calling_module.filename);
	if (baseName.substring(0,5) == 'when_')
		return baseName.substring(5);
	else
		var lower = baseName.substring(4,5).toLowerCase()
		return lower + baseName.substring(5);	
}

module.exports = getPath;