import path from 'path';
import nameHelper from './nameHelper';

export default class SuiteNameBuilder {

    build(modulePath) {
        this._init(modulePath);
        this._extractSuiteBasename();
        this._extractLeadingDirnames();
        return this._suiteNameParts.join(nameHelper.partSeparator);
    }

    _init(modulePath) {
        this._suiteNameParts = [];
        this._pathDirnames = modulePath.split(nameHelper.pathSeparator);
    }

    _extractLeadingDirnames() {
        let pathPart;
        do {
            pathPart = this._pathDirnames.pop();
            this._suiteNameParts.unshift(pathPart);
        }
        while (!nameHelper.isTopFolder(pathPart));

    }

    _extractSuiteBasename() {
        let basename = this._pathDirnames.pop();
        this._suiteNameParts.push(nameHelper.getSuiteBasename(basename));
    }
}