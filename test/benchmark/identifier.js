/*
    Create an identifier object with a string and call #toString
    Do this x time
 */
Identifier = require('../../lib/identifier.js');

var amount = 100000;
console.log('times: ' + amount);

function test() {
    for (var i = 0; i < amount; ++i) {
        var id = new Identifier('com://site/events.model.events');
        id.toString();
    }
}


console.time('bench-identifier');

test(); // run whatever needs to be timed in between the statements

console.timeEnd('bench-identifier');