import fs from 'fs';
import path from 'path';
import * as cacheHelper from './cacheHelper';
import realReporter from './reporter';
import SuiteNameBuilder from './suiteNameBuilder';

export default class Runner {

	constructor(testLoader = { load: require },
		suiteNameBuilder = new SuiteNameBuilder(),
		reporter = realReporter) {

		this._testLoader = testLoader;
		this._suiteNameBuilder = suiteNameBuilder
		this._reporter = reporter;
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
				this._tryRunTestFile(absPath);
				cacheHelper.clear(module);
			});
	}

	_tryRunTestFile(absPath) {
		try {
			this._testLoader.load(absPath);
		} catch (e) {
			let suiteName = this._suiteNameBuilder.build(absPath);
			this._reporter.notRunnableSuite(suiteName, e);
		}
	}

	_runSubdirs(entryDirPath, dirContents) {
		dirContents
			.filter(item => item !== 'node_modules')
			.map(item => path.join(entryDirPath, item))
			.filter(absPath => fs.statSync(absPath).isDirectory())
			.forEach(absPath => this.run(absPath));
	}

}
