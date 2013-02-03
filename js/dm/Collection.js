function Collection() {
    this.collection = new Object();
};

Collection.prototype.add = function(element, index) {
    this.collection[index] = element;
};

Collection.prototype.get = function(index) {
    if(this.collection[index] != undefined) {
        return this.collection[index];
    } else {
        return undefined;
    }
}

Collection.prototype.toString = function() {
    return "Collection";
};
