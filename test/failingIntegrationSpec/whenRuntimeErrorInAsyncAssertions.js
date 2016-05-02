let calling_module = module;
let when = require('../../index').load(calling_module);

when(() => {}, {}).then(it => {
    it('crashes').assertEqual(t, t);
})
