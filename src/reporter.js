import style from 'console-style'
let { green, yellow, red } = style;
let _l = console.log;

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
        _l(green(`  ✓ ${testname}`));
        process.summary.passed++;
    }

    static warn(message) {
        _l(yellow(`\n${message}`));
    }

    static fail(testname, ...extraArgs) {

        let errorMessage = red(`   ✘ ${testname}`),
            traceLines = extraArgs.map(line => {
                return `        ${line}`;
            })
            .join('\n');
        _l(errorMessage);
        _l(traceLines);

        let summaryMessage = '';
        summaryMessage += `\n${process.summary.lastSuiteName}`;
        summaryMessage += `\n${errorMessage}`
        summaryMessage += `\n${traceLines}`
        summaryMessage += `\n------------`;

        process.summary.messages.push(summaryMessage);
        process.summary.failed++;
    }

    static inconclusive(testname) {
        _l(yellow(`  ! ${testname}`));
        process.summary.inconclusive++;
    }

    static suite(suite_name) {
        process.summary.lastSuiteName = suite_name;
        _l(`\n ${suite_name}`);
        process.summary.suites++;
    }


    static inconclusiveSuite(suite_name, err) {
        let errorMessage = err.stack || err;

        let msg = red(`  ${errorMessage}`);
        let summaryMsg = `${suite_name}\n${msg}\n------------`;

        _l(msg);

        process.summary.messages.push(summaryMsg);
    }

    static notRunnableSuite(suite_name, err) {
        let errorMessage = err.stack || err;

        let msg = red(`  ${errorMessage}`);
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
        summaryMessage += `passed: ${green(s.passed)}, `
        summaryMessage += `failed: ${red(s.failed)}, `
        summaryMessage += `inconclusive: ${yellow(s.inconclusive)}, `,
        summaryMessage += `not runnable suites: ${red(s.notRunnableSuites)}`;

        _l(summaryMessage);
    }


}
