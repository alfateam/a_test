import realReporter from './reporter';
import It from './it';

export default class Result {

	constructor(reporter = realReporter,
		it = new It()) {
		this._reporter = reporter;
		this._it = it;
	}

	setup(suiteName, arrangeActChain) {
        this._suiteName = suiteName;
        this._arrangeActChain = arrangeActChain;
    }

    get suiteName() {
    	return this._suiteName;
    }

    get arrangeActChain() {
    	return this._arrangeActChain;
    }

    it(title) {
         try {
             this._arrangeActChain.executeSync()
             this._reporter.suite(this._suiteName);
             return this._it.regularIt(title);

         } catch (e) {
            this._reporter.inconclusiveSuite(this._suiteName, e);
            return this._it.inconclusiveIt(title);
         }
    }

    then(callback) {
        return this._arrangeActChain
            .execute()
            .then(result => this._ok(result), e => this._fail(e))
            .then(result => {
                this._reportSuiteName();
                return callback(result);
            });
    }

    _ok() {
        this._reportSuiteName = this._reporter.suite.bind(this._reporter, this._suiteName);
        return this._it.regularIt;
    }

    _fail(e) {
        this._reportSuiteName = this._reporter.inconclusiveSuite.bind(this._reporter.inconclusiveSuite, this._suiteName, e);
        return this._it.inconclusiveIt;
    }
}
