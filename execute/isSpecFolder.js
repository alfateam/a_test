module.exports = function (folder) {
	return endsWith('spec') || endsWith('specs');

	function endsWith(suffix) {
		return folder.toLowerCase().indexOf(suffix, folder.length - suffix.length) !== -1;		
	}
}