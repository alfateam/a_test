import _regularIt from './regularIt';
import _inconclusiveIt from './inconclusiveIt';

export default class It {

	regularIt(...args) {
		return _regularIt.it(...args);
	}

	inconclusiveIt(...args) {
		return _inconclusiveIt.it(...args);
	}
}
