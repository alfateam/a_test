import globby from 'globby';
import path from 'path';
import child_process from 'child_process';
import fs from 'fs';

let status = 0;
process.on('exit', () => {
    process.exitCode = status;
})

const runnerPath = path.resolve('./dist/bin/a.js');
fs.chmodSync(runnerPath, 0o755);
let harness = [];

harness.push(async() => {
    let paths = await globby(['./test-compiled/**/*Tests.js']);
    console.log('\n\nUNIT TESTS')
    paths.forEach(p => {
        console.log('\n' + p);
        let result = child_process.spawnSync('nodejs', [path.resolve(p)], {stdio: 'inherit'});
        status += result.status;
    });
});

harness.push(async() => {
    let paths = await globby([ './test-compiled/integrationSpec/**/when*.js', '!./test-compiled/**/node_modules/*.js']);
    console.log('\n\nINTEGRATION TESTS using "node path/to/whenFoo.js"')
    paths.forEach(p => {
        let result = child_process.spawnSync('nodejs', [path.resolve(p)], {stdio: 'inherit'});
        status += result.status;
    });
});

harness.push(async() => {
    console.log('\n\nINTEGRATION TESTS using "./dist/bin/a.js testDir"');
    let result = child_process.spawnSync(runnerPath, [ './test-compiled/integrationSpec' ], {stdio: 'inherit'});
    status += result.status;
});

harness.push(async() => {
    console.log('\n\nINTEGRATION TESTS using "./dist/bin/a.js" alone');
    let cwd = path.resolve('./test-compiled/integrationSpec');
    let result = child_process.spawnSync(runnerPath, {stdio: 'inherit', cwd: cwd});
    status += result.status;
});


(async () => {
    for (let t of harness) {
        await t();
    }
})();
