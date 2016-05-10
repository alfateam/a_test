var c = {};
var calling_module = module;
var when = require('../../index')
    .load(calling_module);

when(c).then(it => {
    it('should wait for act to complete') .assertStrictEqual(true, c.isLoaded);
});
