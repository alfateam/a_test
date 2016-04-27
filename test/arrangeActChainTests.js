import test from './test';
import assert from 'assert';
import ArrangeActChain from '../dist/arrangeActChain';

(() => {
    let sut = new ArrangeActChain();
    let context = {
        markers: []
    };
    
    let act0 = c => {
        c.markers.push(0);
    };

    let act1 = c => {
        return new Promise(resolve => {
            let p = new Promise(resolve => {
                c.markers.push(1);
                resolve();
            });
            resolve(p);
        });
    };

    let act2 = c => {
        return new Promise(resolve => {
            c.markers.push(2);
            resolve();
        });
    };

	let act3 = c => {
        c.markers.push(3);
    };


    test('execute runs async acts sequentially', async () => {
        sut.setup([act0, act1, act2, act3], context);
        await sut.execute();
        assert.deepEqual(context.markers, [0, 1, 2, 3]);
    });
})();

(() => {
    let sut = new ArrangeActChain();
    let context = {
        markers: []
    };

    let act0 = c => {
        c.markers.push(0);
    };

    let act1 = c => {
        c.markers.push(1);
    };

    let act2 = c => {
        c.markers.push(2);
    };

    let act3 = c => {
        c.markers.push(3);
    };


    test('execute runs sync acts sequentially', () => {
        sut.setup([act0, act1, act2, act3], context);
        sut.executeSync();
        assert.deepEqual(context.markers, [0, 1, 2, 3]);
    });
})();