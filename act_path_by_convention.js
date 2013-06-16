var path = require('path');

function getPath(calling_module) {

	var basename = path.basename(calling_module.filename);
	return basename.replace('when_', '');
}

module.exports = getPath;