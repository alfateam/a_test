var c = {};
var calling_module = module;
var when = require('../../index').load(calling_module);

when(c)
	.it('should require act by convention')
		.assert(c.act_is_loaded);