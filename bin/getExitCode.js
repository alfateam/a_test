module.exports = function(summary) {
	var failedAndInconclusive = 0;
	
	if (summary.failed !== undefined)	
		 failedAndInconclusive += summary.failed;
	if (summary.inconclusive !== undefined)
		failedAndInconclusive += summary.inconclusive;

	return failedAndInconclusive;
};