// Avoid 'console' errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});


    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

}());

if (!window.console) {var console = {};}
if (!console.log) {console.log = function(params) {};}

// requestAnimationFrame for smart animating
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

Number.isNaN = Number.isNaN || function(value) {
            return value !== value;
        }

// Array
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.contains = function(obj){
    var i = 0;
    var l = this.length;

    for(i=0;i<l;i++)
    {
        if (this[i] === obj)
            return true;
    }

    return false;
};

Array.prototype.shuffle = function() {
    var tmp, rand;
    for(var i =0; i < this.length; i++) {
        rand = Math.floor(Math.random() * this.length);
        tmp = this[i];
        this[i] = this[rand];
        this[rand] = tmp;
    }
};

Array.prototype.random = function()
{
    return this[Math.floor(Math.random() * this.length)];
};

HTMLImageElement.prototype.loaded = function()
{
    return this.complete && this.naturalHeight != 0;
};

// Date
if (!Date.now) {
    Date.now = function() {
        return new Date().valueOf();
    }
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

//Limits a value between start and end values.
Math.clamp = function(value, start, end) {
    if(value < start) return start;
    else if(value > end) return end;
    else return value;
};

//Limits a value between 0 and 1 .
Math.clamp01 = function(value) {
    if(value < 0) return 0;
    else if(value > 1) return 1;
    else return value;
};

window.dist = function(p1X,p1Y,p2X,p2Y)
{
    var xs = p2X - p1X;
    var ys = p2Y - p1Y;
    return Math.sqrt( xs * xs + ys * ys );
};

window.linkWarning = function(event,target)
{
    if(typeof event.stopPropagation === 'function')
    {
        event.stopPropagation();
    }

    return confirm("Wollen Sie wirklich die Seite "+target.href+" besuchen?");
};

window.objectGetValues = function(obj) {
    return Object.keys(obj).map(function(e) { return obj[e]});
};

window.objectGetKeys = function(obj) {
    return Object.keys(obj);
};

window.clone = function (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};

window.uniqid = function()
{
    var out = Math.round(Math.random()*new Date().getTime());
    return out;
};