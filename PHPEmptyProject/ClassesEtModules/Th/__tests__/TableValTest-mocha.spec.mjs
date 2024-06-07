import assert from 'assert';
import {TableVal} from "../tableval.mjs";

describe('TableVal', function(){
    describe('somme', function(){
        it('somme (1,2,3,4,-5) == 5', function(){
            let t = new TableVal(1,2,3,4,-5);
            assert.strictEqual(t.total, 5);
        });
        it('initialisation', function(){
            let t = new TableVal(1,2,3,4,-5);
            assert.deepEqual(t, {tab: [1,2,3,4,-5]});
        });
        it('isEmpty', function(){
            let t = new TableVal(1,2,3,4,-5);
            assert.strictEqual(t.isEmpty(), false, 'table t is not empty');
            let v = new TableVal();
            assert.ok(v.isEmpty(), 'table v is empty');
        });
    });
});