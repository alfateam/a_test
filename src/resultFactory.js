import Result from './result';

export default class ResultFactory {

    create(suiteName, arrangeActChain) {
        let result = new Result();
        result.setup(suiteName, arrangeActChain);
        return result;
    }
}
