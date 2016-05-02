import StyledConsole from 'styled-console';
let sc = new StyledConsole();
let _p = sc.parse.bind(sc);
let _l = text => {
    console.log(_p(text));
};

export default class reporter {

    static setExitCode() {
        let { summary } = process;
        process.exitCode = summary.failed + summary.inconclusive + summary.notRunnableSuites;
    }

    static ensureStatsInitialized() {
        if (process.summary)
            return;
        process.summary = {
            passed: 0,
            failed: 0,
            suites: 0,
            notRunnableSuites: 0,
            inconclusive: 0,
            messages: []
        };
    }

    static ok(testname) {
        _l(`  <c:green>✓ ${testname}</c:green>`);
        process.summary.passed++;
    }

    static warn(message) {
        _l(`\n<c:yellow>${message}</c:yellow>`);
    }

    static fail(testname, ...extraArgs) {

        let errorMessage = `  <c:red> ✘ ${testname}</c:red>`,
            traceLines = extraArgs.map(line => {
                return `        ${line}`;
            })
            .join('\n');
        _l(errorMessage);
        _l(traceLines);

        let summaryMessage = ``;
        summaryMessage += `\n${process.summary.lastSuiteName}`;
        summaryMessage += `\n${errorMessage}`
        summaryMessage += `\n${traceLines}`
        summaryMessage += `\n------------`;

        process.summary.messages.push(summaryMessage);
        process.summary.failed++;
    }

    static inconclusive(testname) {
        _l(`  <c:yellow>! ${testname}</c:yellow>`);
        process.summary.inconclusive++;
    }

    static suite(suite_name) {
        process.summary.lastSuiteName = suite_name;
        _l(`\n ${suite_name}`);
        process.summary.suites++;
    }


    static inconclusiveSuite(suite_name, err) {
        let errorMessage = err.stack || err;

        let msg = _p(`  <c:red>${errorMessage}</c:red>`);
        let summaryMsg = `${suite_name}\n${msg}\n------------`;

        _l(msg);

        process.summary.messages.push(summaryMsg);
    }

    static notRunnableSuite(suite_name, err) {
        let errorMessage = err.stack || err;

        let msg = _p(`  <c:red>${errorMessage}</c:red>`);
        let summaryMsg = `${suite_name}\n${msg}\n------------`;

        _l(msg);

        process.summary.messages.push(summaryMsg);
        process.summary.notRunnableSuites++;
    }

    static summary() {
        _l('\n========== Summary =============\n');
        let s = process.summary;

        s.messages.forEach(m => {
            _l(` ${m}`);
        });

        let summaryMessage = `\n`;
        summaryMessage += `suites: ${s.suites}, `;
        summaryMessage += `passed: <c:green>${s.passed}</c:green>, `
        summaryMessage += `failed: <c:red>${s.failed}</c:red>, `
        summaryMessage += `inconclusive: <c:yellow>${s.inconclusive}</c:yellow>, `,
        summaryMessage += `not runnable suites: <c:red>${s.notRunnableSuites}</c:red>`;

        _l(summaryMessage);
    }


}
