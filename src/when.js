import TestSuite from './testSuite';
import reporter from './reporter';

if(process.env.A_TEST_BABEL_REGISTER)
    require('babel-register');

if(!global._babelPolyfill)
	require('babel-polyfill');

if(!global._willSetExitCode) {
	process.on('exit', () => reporter.setExitCode());
	global._willSetExitCode = true;
}


export default function when(act, context) {
	reporter.ensureStatsInitialized();
    if (arguments.length === 1) {
        context = arguments[0];
        act = undefined;
    }
    let testSuite = when.testSuite || new TestSuite();
    return testSuite.execute(act, context, when.calling_module.filename);
}
