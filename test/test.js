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

export default test;