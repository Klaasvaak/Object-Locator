var BaseObject = require('../../lib/object.js');

var log = console.log;

console.time('bench-identifier');

var amount = 100000;
console.log('times: ' + amount);

function test() {
    for (var i = 0; i < amount; ++i) {
        var mixin = new BaseObject({});
        mixin.someMixedFunction = function(param1, param2) {
            console.log(param1);
            console.log(param2);
            console.log('hello there from someMixedFunction!');
        };

        mixin.getMixableFunctions = function() {
            return { 'someMixedFunction': this.someMixedFunction };
        };

        var o = new BaseObject({ behaviors: [ mixin ] });
        o.mixinBehaviors();

        o.someMixedFunction("bla1", "bla2");
    }
}

test();

console.timeEnd('bench-identifier');
