let reset;
try {
    reset = require('a_mock').expectRequire.reset;
} catch (e) {}

export function clear(mod) {
    unloadLastChildOf(mod);
    clearRequireCache();
    clearAMockCache();
}

function unloadLastChildOf(mod) {
    var lastIndex = mod.children.length - 1;
    mod.children.splice(lastIndex, 1);
}

function clearRequireCache() {
    for (var prop in require.cache) {
        if (prop.match(/\.node$/) || prop.match(/babel/))
            continue;
        delete require.cache[prop];
    }
}

function clearAMockCache() {
    if (reset) {
        reset();
    }
}
