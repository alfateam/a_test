import fs from 'fs';
import path from 'path';
import * as cacheHelper from './cacheHelper';

export default class Runner {

	constructor(testLoader = { load: require }) {
		this._testLoader = testLoader;
	}

	run(entryDirPath) {
		let dirContents = fs.readdirSync(entryDirPath)
		this._runTestFiles(entryDirPath, dirContents);
		this._runSubdirs(entryDirPath, dirContents)
	}

	_runTestFiles(entryDirPath, dirContents) {
		dirContents
			.filter(item => /^when/i.test(item))
			.map(item => path.join(entryDirPath, item))
			.filter(absPath => fs.statSync(absPath).isFile())
			.forEach(absPath => {
				this._testLoader.load(absPath);
				cacheHelper.clear();
			});
	}

	_runSubdirs(entryDirPath, dirContents) {
		dirContents
			.filter(item => item !== 'node_modules')
			.map(item => path.join(entryDirPath, item))
			.filter(absPath => fs.statSync(absPath).isDirectory())
			.forEach(absPath => this.run(absPath));
	}

}
