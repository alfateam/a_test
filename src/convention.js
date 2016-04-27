import FsHelper from './fsHelper';
import path from 'path';
import nameHelper from './nameHelper';

export default class Convention {

    constructor(fsHelper = new FsHelper()) {
        this._fsHelper = fsHelper;
    }

    getSuiteBasePath(suiteModulePath) {
        let suiteDirname = path.dirname(suiteModulePath),
            baseActFilename = nameHelper.getSuiteBaseFilename(suiteModulePath);

        let baseActInSameDir = path.join(suiteDirname, baseActFilename);
        if (this._fsHelper.exists(baseActInSameDir)) {
            return baseActInSameDir;
        }

        return this._tryGetFromParentHierarchy(suiteModulePath);
    }



    getActBasePath(actPath) {
        return this._tryGetFromParentHierarchy(actPath);
    }

    _tryGetFromParentHierarchy(modulePath) {
        let relevantDirs = this._fsHelper.getRelevantDirs(modulePath);
        for (let dir of relevantDirs) {
            if (nameHelper.isTopFolder(dir))
                continue;

            let candidatePath = this._tryGetByNameMatchingParentDir(dir);
            if (candidatePath)
                return candidatePath;

            candidatePath = this._tryGetLoneActInParent(dir);
            if (candidatePath)
                return candidatePath;
        }
    }

    _tryGetByNameMatchingParentDir(dir) {
        let candidatePath = `${dir}.js`;
        if (this._fsHelper.exists(candidatePath)) {
            return candidatePath;
        }
    }

    _tryGetLoneActInParent(dir) {
        let parentDir = path.resolve(path.join(dir, '..'));
        let filenames = this._fsHelper.getFilesInDir(parentDir);

        let candidateFilename = nameHelper.getSingleActFilename(filenames);
        if (candidateFilename) {
            return path.join(parentDir, candidateFilename);
        }

    }
}