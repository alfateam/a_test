
var separator = ' \u00bb ';

function build_suite_name(whenModule) {

	var splitChar = '/';
	if (whenModule.filename.indexOf('\\') > -1)
		splitChar = '\\';
	var folderArray = whenModule.filename.split(splitChar);
	folderArray.shift();
	var shallowActName = actName();

	return folderArrayToWhenName() + separator + shallowActName;


	function folderArrayToWhenName() {
		var name = folderArray.pop();
		if (endsWithSpec(name))
			return name;
		return folderArrayToWhenName()  + separator  +  name;
	}

	function actName()
	{		
		var shortFileName = folderArray.pop();
		shortFileName = shortFileName.replace(/when_/i,'');
		shortFileName = shortFileName.replace(/when/i,'');
		return shortFileName.split('.js')[0];
	}
}

function endsWithSpec(string) {
	return endsWith(string,'spec') || endsWith(string,'specs');	
}

function endsWith(string,suffix) {
	return (string.toLowerCase().indexOf(suffix,string.length - suffix.length) >= 0)
}

module.exports = build_suite_name;


