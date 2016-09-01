(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "angular", "query-string", "angular-localforage" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("angular"), require("query-string"), require("angular-localforage"));
    } else {
        root.ngOAuth2Localforage = factory(root.angular, root.queryString, "LocalForageModule");
    }
})(this, function(angular, queryString, LocalForageModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _angular = require("angular");
    var _angular2 = _interopRequireDefault(_angular);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    var ngModule = _angular2.default.module("ng-oauth2-localforage", []);
    exports.default = ngModule;
    return ngModule;
});