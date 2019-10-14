if (!String.replaceAll) {
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
}
if (!String.capitalizeFirst) {
    String.prototype.capitalizeFirst = function() {
        return this.charAt(0).toUpperCase() + this.substring(1);
    };
}

function getCookie(name) {
    var it = document.cookie.split(";");
    for (var x = 0; x < it.length; x++) {
        if (it[x].startsWith(name + "="))
            return it[x].substring(it[x].indexOf("=") + 1);
    }
}

function fetchXHR(addr, callback, error, xhr) {
    if (!xhr)
        xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        if (this.status >= 400 && error)
            error.call(this);
        else
            callback.call(this);
    });
    xhr.addEventListener("error", error);
    xhr.open("GET", addr);
    xhr.send();
}
// Remove a class from all decendents of an element that have a given class
function removeClassByClass(el, cls, clsToRemove) {
    var els = el.getElementsByClassName(cls);
    for (var x = 0; x < els.length; x++)
        els[x].classList.remove(clsToRemove);
}

function DGE(s) {
    return document.getElementById(s);
}

function DGEC(s) {
    return document.getElementsByClassName(s);
}

function DCE(s) {
    return document.createElement(s);
}