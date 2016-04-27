import path from 'path';

export default class nameHelper {

    static getSuiteBasename(suiteModulePath) {
        let basename = path.basename(suiteModulePath);
        return basename.replace(/^when(_)?|\.js/ig, '');
    }

    static getSuiteBaseFilename(suiteModulePath) {
        return path.basename(suiteModulePath)
            .replace(/^when(_)?/ig, '')
            .replace(/^(.)/, $1 => $1.toLowerCase());
    }

    static isTopFolder(dirname) {
        return /spec(s)?$/i.test(dirname);
    }

    static get pathSeparator() {
        return path.sep;
    }

    static get partSeparator() {
        return ' » ';
    }

    static getSingleActFilename(filenames) {
        let actFilenames = filenames
            .filter(f => !/^when/i.test(f))
            .filter(f => /\.js$/.test(f));

        if (actFilenames.length === 1)
            return actFilenames[0];

    }
}
