function AppContext() {
    var instance = this;
    var services = new Object();

    this.add = function(service, key) {
        services[key] = service;
    }

    this.get = function(key) {
        if(services[key] != undefined) {
            return services[key];
        } else {
            throw new Error("Object " + key + " is not defined");
        }
    }

    AppContext = function() {
        return instance;
    }
}

AppContext.prototype.init = function() {
    this.add(new Audiolet(), "Audiolet");
    this.add(new WAVDecoder(), "WAVDecoder");
    this.add(new Collection(), "PadsCollection");
    this.add(new Collection(), "SoundsCollection");

    AppContext.prototype.init = function() {
        return true;
    }
}
