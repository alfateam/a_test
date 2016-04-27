var c = {};
var calling_module = module;
var when = require('../../index')
    .load(calling_module);

when(c)
    .then(function(it) {
        it('should wait for act to complete')
            .assertStrictEqual(true, c.isLoaded);
    })
    .then(setExitCode, setExitCode);


function setExitCode() {
    if (process.summary.passed !== 1)
    	process.exitCode = 1;
}