var Manager = require('./manager.js');

function BaseObject(config) {
    this.behaviors = config.behaviors || [];
    this.identifier = config.identifier;
}

BaseObject.prototype.initialize = function(config, done) {
    if (config.auto_mixin_behaviors) {
        this.mixinBehaviors();
    }
    done();
};

BaseObject.prototype.processBehaviors = function(done) {
    done();
};

BaseObject.prototype.mixin = function(mixin, proxy) {
    if (typeof mixin.getMixableFunctions === 'function') {
        var functionsMap = mixin.getMixableFunctions();

        for(var fnName in functionsMap) {
            if (proxy && proxy.name) {
                var evalValue = 'this.' + fnName + ' = ';
                evalValue += 'function() { return this.' + proxy.name;
                proxy.index ? (evalValue += '[' + proxy.index + '].') : (evalValue += '.');
                evalValue += fnName + '.apply(this.' + proxy.name + ', arguments); };';
                eval(evalValue);
            } else {
                this[fnName] = functionsMap[fnName];
            }

        }
    } else {
        console.log('BaseObject#mixin: object given without function getMixableFunctions');
    }
};

BaseObject.prototype.mixinBehaviors = function() {
    var self = this;

    this.behaviors.forEach(function(behavior, behaviorIndex) {
        self.mixin(behavior, { name: 'behaviors', 'index': behaviorIndex });
    });
};

BaseObject.prototype.getMixableFunctions = function() {
    return {};
};

BaseObject.prototype.getObject = function(identifier, callback) {
    if (!this.manager) {
        this.manager = new Manager();
    }

    this.manager.getObject(identifier, function(obj) {

    });
};

module.exports = BaseObject;