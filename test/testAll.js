import globby from 'globby';
import path from 'path';
import child_process from 'child_process';
import fs from 'fs';
import test from './test';

let status = 0;
process.on('exit', () => {
    process.exitCode = status;
})

const runnerPath = path.resolve('./dist/bin/a.js');
fs.chmodSync(runnerPath, 0o755);
let harness = [];

harness.push(async() => {
    let paths = await globby(['./test-compiled/**/*Tests.js']);
    console.log('\n\n###### UNIT TESTS #######');
    let sum = 0;
    paths.forEach(p => {
        console.log('\n' + p);
        let result = child_process.spawnSync('node', [path.resolve(p)], {stdio: 'inherit'});
        sum += result.status;
    });

    assert(sum === 0);
});

harness.push(async() => {
    let paths = await globby([ './test-compiled/integrationSpec/**/when*.js', '!./test-compiled/**/node_modules/*.js']);
    console.log('\n\n###### INTEGRATION TESTS using "node path/to/whenFoo.js" #######');
    let sum = 0;
    paths.forEach(p => {
        let result = child_process.spawnSync('node', [path.resolve(p)], {stdio: 'inherit'});
        sum += result.status;
    });

    assert(sum === 0);
});

harness.push(async() => {
    console.log('\n\n###### INTEGRATION TESTS using "./dist/bin/a.js testDir" #######');
    let result = child_process.spawnSync(runnerPath, [ './test-compiled/integrationSpec' ], {stdio: 'inherit'});
    assert(result.status === 0);
});

harness.push(async() => {
    console.log('\n\n###### INTEGRATION TESTS using "./dist/bin/a.js" alone #######');
    let cwd = path.resolve('./test-compiled/integrationSpec');
    let result = child_process.spawnSync(runnerPath, {stdio: 'inherit', cwd: cwd});
    assert(result.status === 0);
});

harness.push(async() => {
    console.log('\n\n###### INTEGRATION TESTS using "./dist/bin/a.js" should fail against tests with runtime errors in assertions #######');
    let cwd = path.resolve('./test-compiled/failingIntegrationSpec');
    let result = child_process.spawnSync(runnerPath, {stdio: 'inherit', cwd: cwd});

    assert(result.status != 0);
});


function assert(condition) {
    if(condition) {
        console.log('\n####### OK #######')
    } else {
        console.log('\n####### FAIL #######')
        status++;
    }
}
test.runHarness(harness);
