var Utils = function() {}

Utils.getById = function(e) {
    return document.getElementById(e);
}

Utils.show = function(e) {
    e.style.display = "block";
}

Utils.hide = function(e) {
    e.style.display = "none";
}
