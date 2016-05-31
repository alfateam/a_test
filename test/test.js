import style from 'console-style'
let { green, yellow, red } = style;



let test = async (message, fn) => {
    try {
        await fn();
        console.log(green(`    ✓ ${message}`));
    } catch (err) {
        console.log(red(`    ✘ ${message}`));
        console.log(err);
        process.exitCode = 1;
    }
};
test.head = headerMessage => {
        console.log(green(`\n ** ${headerMessage} **`));
};

test.runHarness = async harness =>{
    for (let t of harness) {
        try {
            await t();
        } catch(e) {
            console.log(e.stack || e);
            process.exitCode = 1;
        }
    }
}

export default test;
