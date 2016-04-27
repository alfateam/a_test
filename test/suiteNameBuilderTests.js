import test from './test';
import assert from 'assert';
import SuiteNameBuilder from '../dist/suiteNameBuilder';

(() => {
    
    let sut = new SuiteNameBuilder();

    test('building with when_ returns folder names separated with right_quotes up to spec folder', () => {
        let result = sut.build('/path/spec/givenA/givenB/when_Act.js');
        assert.equal(result, 'spec » givenA » givenB » Act');
    });

    test('building with when returns folder names separated with right_quotes up to spec folder', () => {
        let result = sut.build('/path/spec/specGivenA/givenB/whenAct.js');
        assert.equal(result, 'spec » specGivenA » givenB » Act');
    });

    test('building with when and specs returns folder names separated with right_quotes up to specs folder', () => {
        let result = sut.build('/path/specs/givenA/givenB/whenAct.js');
        assert.equal(result, 'specs » givenA » givenB » Act');
    });

})();