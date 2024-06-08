import assert from 'assert';
import {Classement, Cyclist} from "../Cyclist.mjs";

describe('Classement', function(){
    describe('Cyclist', function(){
        it('Print2Cyclist', function(){
            let cyclist1 = new Cyclist("126","DUPONT J", 10)
            let cyclist2 = new Cyclist("83","MATMAH", 26)
            let classement = new Classement([], 0)
            classement.addCyclist(cyclist1, cyclist2)

            let expectedCyclists = [
                new Cyclist("126", "DUPONT J", 10),
                new Cyclist("83", "MATMAH", 26)
            ];

            assert.deepEqual(expectedCyclists, classement.cyclists);
            assert.strictEqual(expectedCyclists.length, classement.cyclists.length)
        });
    });
});