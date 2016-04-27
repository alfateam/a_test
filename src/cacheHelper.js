let reset;
try {
    reset = require('a_mock').expectRequire.reset;
} catch (e) { }

export function clear() {
    for (var prop in require.cache) {
        if (prop.match(/\.node$/) || prop.match(/babel/))
            continue;
        delete require.cache[prop];
    }
    if (reset) {
        reset();
    }
}
