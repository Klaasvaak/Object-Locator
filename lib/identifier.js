//var url = require('url');

// [scheme]://[authority]/[package].[path].[name]
function Identifier(identifier) {
    this.scheme = '';
    this.authority = '';
    this.package = '';
    this.path = '';
    this.name = '';

    //TODO: refactor, but it's fast for now
    var parts = identifier.split('://');
    this.scheme = parts[0];
    parts = parts[1].split('/');
    this.authority = parts[0];
    parts = parts[1].split('.');
    this.package = parts.shift();
    this.name = parts.pop();
    this.path = parts.join('.');

}

Identifier.prototype.toString = function() {
    return this.scheme + '://' + this.authority + '/' + this.package + '.' + this.path + '.' + this.name;
};

module.exports = Identifier;