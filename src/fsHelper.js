import nameHelper from './nameHelper';
import realPath from 'path';
import realFs from 'fs';

export default class FsHelper {

    constructor(path = realPath, fs = realFs) {
        this._path = path;
        this._fs = fs;
    }

    getRelevantDirs(suiteModulePath) {
        let result = [];
        let suiteModuleDirPath = this._path.dirname(suiteModulePath);
        let dirnames = suiteModuleDirPath.split(this._path.sep);

        let currentDirname;
        while (!nameHelper.isTopFolder(currentDirname)) {
            result.push(dirnames.join(this._path.sep));
            currentDirname = dirnames.pop();
        }
        return result;
    }

    getFilesInDir(path) {
        return this._fs.readdirSync(path);
    }

    exists(path) {
        return this._fs.existsSync(path);
    }
}
