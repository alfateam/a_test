var reporter = require('./reporter').default;


function it(title) {
    var retval = {};

    retval.assertOk = inconclusiveAssert;

    retval.assert = retval.assertOk;

    retval.assertEqual = inconclusiveAssert;

    retval.assertNotEqual = inconclusiveAssert;

    retval.assertDeepEqual = inconclusiveAssert;

    retval.assertNotDeepEqual = inconclusiveAssert;

    retval.assertStrictEqual = inconclusiveAssert;

    retval.assertNotStrictEqual = inconclusiveAssert;

    retval.assertThrows = inconclusiveAssert;

    retval.assertDoesNotThrow = inconclusiveAssert;

    retval.assertFail = inconclusiveAssert;

    function inconclusiveAssert() {
        reporter.inconclusive(title);
        return new_it();
    }


    return retval;
}

function new_it() {
    return {
        it: it
    };
}



module.exports = new_it();
