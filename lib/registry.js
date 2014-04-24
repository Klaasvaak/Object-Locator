function Registry() {
    this.schemas = [];
    this.authorities = [];
}

Registry.prototype.addSchema = function(schema) {
    this.schemas.add(schema);

    return this;
};

Registry.prototype.hasSchema = function(schema) {
    this.schemas.forEach(function(item) {
        if (item == schema) {
            return true;
        }
    });

    return false;
};

Registry.prototype.addAuthotity = function(authority) {
    this.authorities.add(authority);

    return this;
};

Registry.prototype.hadAuthority = function(authority) {
    this.authorities.forEach(function(item) {
        if (item == authority) {
            return true;
        }
    });

    return false;
};

module.exports = Registry;