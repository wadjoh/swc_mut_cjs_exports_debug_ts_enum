"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _task = require("./task");
Object.defineProperty(exports, "enumValue", {
    enumerable: true,
    get: function get() {
        return enumValue;
    },
    set: function set(v) {
        enumValue = v;
    },
    configurable: true
});
var enumValue = _task.SomeEnum.A;
console.log({
    enumValue: exports.enumValue
});
