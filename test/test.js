import StyledConsole from 'styled-console';
let styledConsole = new StyledConsole();
let p = styledConsole.parse.bind(styledConsole);



let test = async (message, fn) => {
    try {
        await fn();
        console.log(p(` <c:green>   ✓ ${message}</c:green>`));
    } catch (err) {
        console.log(p(` <c:red>   ✘ ${message}</c:red>`));
        console.log(err);
        process.exitCode = 1;
    }
};
test.head = headerMessage => {
        console.log(p(`\n <c:green>** ${headerMessage} **</c:green>`));
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
