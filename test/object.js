var assert = require('assert');
var BaseObject = require('../lib/object.js');

describe('BaseObject', function(){
    describe('#mixin()', function(){
        it('should not mix anything when Object#getMixableFunctions() returns no functions', function(){
            var object = new BaseObject({});
            var mixin = new BaseObject({});

            var array = [];
            for (var index in object) {
                array.push(object[index]);
            }

            object.mixin(mixin);

            var aftermixin = [];
            for (var index in object) {
                aftermixin.push(object[index]);
            }

            assert.equal(array.length, aftermixin.length);
            for (var i = 0; i < array.length; i++) {
                assert.equal(array[index], aftermixin[index]);
            }
        });
        it('should mix the functions returned by Object#getMixableFunctions()', function() {
            var object = new BaseObject({});
            var mixin = new BaseObject({});

            // create 3 functions on the mixin
            mixin.firstMixed = function() {
                return 'Hello from #firstMixed()!';
            };

            mixin.secondMixed = function(param) {
                return 'Hello from #secondMixed()!';
            };

            mixin.thirdMixed = function() {
                return '#thirdMixed() should not be mixed!';
            };

            // Let the mixin return only 2 functions
            mixin.getMixableFunctions = function() {
                return {
                    'firstMixed': this.firstMixed,
                    'secondMixed': this.secondMixed
                }
            };

            object.mixin(mixin);

            assert.equal(typeof object.firstMixed, 'function');
            assert.equal(typeof object.secondMixed, 'function');
            assert.equal(typeof object.thirdMixed, 'undefined');

            assert.equal(object.firstMixed.toString(), mixin.firstMixed.toString());
            assert.equal(object.secondMixed, mixin.secondMixed.toString());
        });
        it('should mix the functions returned by Object#getMixableFunctions() through proxy', function() {
            var object = new BaseObject({});
            var mixin = new BaseObject({});

            // create functions on the mixin that returns a property of the mixin
            mixin.firstMixedProperty = 1337;
            mixin.firstMixed = function() {
                return this.firstMixedProperty;
            };

            // create functions on the mixin that returns a property (number) of the mixin with added value of the paramater
            mixin.secondMixedProperty = 40;
            mixin.secondMixed = function(param) {
                return this.secondMixedProperty + param;
            };

            // Let the mixin return the 2 functions
            mixin.getMixableFunctions = function() {
                return {
                    'firstMixed': this.firstMixed,
                    'secondMixed': this.secondMixed
                }
            };

            object.mixinAsProperty = mixin;
            object.mixin(mixin, { name: 'mixinAsProperty'});

            assert.equal(typeof object.firstMixed, 'function');
            assert.equal(typeof object.secondMixed, 'function');

            assert.equal(object.firstMixed(), mixin.firstMixedProperty);
            assert.equal(object.secondMixed(2), mixin.secondMixedProperty + 2);
        });
    });
});
