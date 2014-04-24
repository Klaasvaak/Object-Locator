var Registry = require('./registry.js');
var Identifier = require('./identifier.js')
var Locator = require('./locator.js')

function Manager(config) {
    this.registry = config.registry || new Registry();
    this.locators = config.locators || {};
}

Manager.prototype.getObject = function(identifier, callback) {
    // Check if callback is given
    if (typeof callback != 'function') {
        console.log('no callback given in Locator#getObject');
        return;
    }

    // Check if identifier is passed as a string
    if (typeof identifier === "string") {
        identifier = new Identifier(identifier);
    }

    // Check if object is in registry
    var object = this.getFromRegistry(identifier);
    if (!object) {
        // Locate the object
        this.locate(identifier, function(err, obj) {
            callback(err, obj)
        });
    } else {

    }
};

Manager.prototype.processBehaviors = function(object) {
    var self = this;

    if (object.behaviors && typeof object.behaviors === 'array') {
        object.behaviors.forEach(function(behavior) {
            if (typeof behavior === 'string' || behavior instanceof Identifier) {
                self.getObject(function(obj) {

                });
            }
        })
    }
};

/**
 * Gets the object from the registry
 * @param identifier object
 * @returns {Object} or {undefined}
 */
Manager.prototype.getFromRegistry = function(identifier) {
    identifier = identifier.toString();
    return this.registry.get(identifier);
};

/**
 * Locate the object from the locators
 * @param identifier
 * @param callback
 */
Manager.prototype.locate = function(identifier, callback) {
    if (this.locators[identifier.scheme]) {
        this.locators[identifier.scheme].getObject(identifier, callback);
    } else {
        console.log('No locator found for resource type: ' + identifier.scheme);
        // TODO error handling
        callback({ err: true });
    }
};

/**
 * Add locator to the locator list
 * @param locator {Locator} or {Function}
 * @param type {String}
 */
Manager.prototype.addLocator = function(locator, type) {
    if (locator instanceof Locator) {
        this.locators.push(locator);
    } else if (typeof locator === "function") {
        var locatorObj = new Locator();
        locatorObj.getObject = locator;
        this.locators.push(locatorObj);
    } else {
        console.log('type for locator: ' + typeof locator + ' is not supported');
    }
};

module.exports = Manager;