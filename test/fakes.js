import RealFsHelper from '../dist/fsHelper';

export let path = {
    dirname: function(filepath) {
        if (filepath === path.expectedFilePath) {
            return path.dirnameToReturn;
        }

    },
    join: function(part1, part2) {
        if (part1 === path.expectedPart1 && part2 === path.expectedPart2) {
            return path.joinedPathToReturn;
        }
    }
}

export let fs = {
    readdirSync: function(path) {
        if (path === this.expectedPath) {
            return this.dirContentToReturn;
        }
    },
    existsSync: function(filepath) {
        if (filepath === this.expectedFileToExist) {
            return this.existsValueToReturn;
        }
    }
}

export class Convention {
    getSuiteBasePath(suiteModulePath) {
        if (suiteModulePath === this.expectedSuiteModulePath) {
            return this.suiteBasePathToReturn;
        }
    }

    getActBasePath(actPath) {
        if (actPath === this.expectedActPath) {
            return this.actBasePathToReturn;
        }
    }
}

export class ModuleLoader {
    load(modulePath) {
        if (modulePath === this.expectedModulePath) {
            return this.moduleToReturn;
        }
    }
}

export class BaseActLoader {
    loadForSuite(lastAct, suiteModulePath) {
        if (lastAct === this.expectedLastAct && suiteModulePath === this.expectedSuiteModulePath) {
            return this.suiteBaseActToReturn;
        }
    }


    loadForAct(act) {
        if (act === this.expectedAct) {
            return this.baseActToReturn;
        }
    }
}

export class ActListLoader {
    load(lastAct, suiteModulePath) {
        if (lastAct === this.expectedLastAct && suiteModulePath === this.expectedSuiteModulePath) {
            return this.loadedActsToReturn;
        }
    }
}

export class FsHelper {
    constructor() {
        this._ = new RealFsHelper();
    }

    getRelevantDirs(suiteModulePath) {
        return this._.getRelevantDirs(suiteModulePath);
    }

    getFilesInDir(path) {
        if (path === this.expectedDir) {
            return this.filesInDirToReturn;
        }
        return [];
    }

    exists(path) {
        if (path === this.expectedFilePath)
            return this.existsValueToReturn;
    }
}

export class SuiteNameBuilder {
    build(suitePath) {
        if (suitePath === this.expectedSuitePath) {
            return this.suiteNameToReturn;
        }
    }
}

export class ArrangeActChainFactory {
    create(act, context, suitePath) {
        if (act === this.expectedAct && context === this.expectedContext && suitePath === this.expectedSuitePath) {
            return this.arrangeActChainToReturn;
        }
    }
}


export class ResultFactory {
    create(suiteName, arrangeActChain) {
        if (arrangeActChain === this.expectedArrangeActChain && suiteName === this.expectedSuiteName) {
            return this.resultToReturn;
        }
    }
}

export class ArrangeActChain {
    executeShouldThrow(err) {
        this._err = err;
    }

    executeSync() {
        if (this._err) {
            throw this._err;
        }
    }

    async execute() {
        if (this._err) {
            throw this._err;
        }
    }
}


export class reporter {
    static suite(suiteName) {        
        this.reportedSuiteName = suiteName;
    }

    static inconclusiveSuite(suiteName, err) {
        this.reportedInconclusiveSuiteName = suiteName;
        this.reportedInconclusiveSuiteError = err;
    }

    static notRunnableSuite(suiteName, err) {
        this.reportedNotRunnableSuiteName = suiteName;
        this.reportedNotRunnableSuiteError = err;
    }
}

export class It {
    regularIt(title) {
        if (title === this.expectedItTitle) {
            return this.resultToReturn;
        }
    }

    inconclusiveIt(title) {
        if (title === this.expectedItTitle) {
            return this.resultToReturn;
        }
    }
}

export class TestSuite {
    execute(act, context, suiteModulePath) {
        if (act === this.expectedAct && context === this.expectedContext && suiteModulePath === this.expectedSuiteModulePath)
            return this.resultToReturn;
    }
}

export class TestLoader {
    constructor() {
        this.loadedPaths = [];
    }

    load(p) {
        this.loadedPaths.push(p)
    }
}
