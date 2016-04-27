var c = {};
var calling_module = module;
var when = require('../../../index').load(calling_module);

when(c)
    .it('should be able to run tests that are located deeper')
    .assertStrictEqual(true, c.isBazActLoaded);
