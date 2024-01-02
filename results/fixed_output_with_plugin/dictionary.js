"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SomeEnum", {
    enumerable: true,
    get: function get() {
        return SomeEnum;
    },
    set: function set(v) {
        SomeEnum = v;
    },
    configurable: true
});
var SomeEnum;
(function(SomeEnum) {
    exports.SomeEnum["A"] = "A";
    exports.SomeEnum["B"] = "B";
})(exports.SomeEnum || (SomeEnum = {}));
