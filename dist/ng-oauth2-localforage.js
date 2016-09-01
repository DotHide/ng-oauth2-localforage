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
    "use strict";
    var _angular = require("angular");
    var _angular2 = _interopRequireDefault(_angular);
    var _queryString = require("query-string");
    var _queryString2 = _interopRequireDefault(_queryString);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var defaults = {
        baseUrl: null,
        clientId: null,
        clientSecret: null,
        grantPath: "/oauth2/token",
        revokePath: "/oauth2/revoke"
    };
    function OAuthProvider() {
        var config;
        this.configure = function(params) {
            if (config) {
                throw new Error("Already configured.");
            }
            if (!(params instanceof Object)) {
                throw new TypeError("Invalid argument: `config` must be an `Object`.");
            }
            config = _angular2.default.extend({}, defaults, params);
        };
        this.$get = function($http, OAuthToken) {
            var OAuth = function OAuth() {
                _classCallCheck(this, OAuth);
            };
            return new OAuth();
        };
    }
    "use strict";
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var _angular = require("angular");
    var _angular2 = _interopRequireDefault(_angular);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function OAuthTokenProvider() {
        var config = {
            name: "token"
        };
        this.configure = function(params) {
            if (!(params instanceof Object)) {
                throw new TypeError("Invalid argument: `config` must be an `Object`.");
            }
            _angular2.default.extend(config, params);
            return config;
        };
        this.$get = function($localForage) {
            var OAuthToken = function() {
                function OAuthToken() {
                    _classCallCheck(this, OAuthToken);
                }
                _createClass(OAuthToken, [ {
                    key: "setToken",
                    value: function setToken(data) {
                        return $localForage.setItem(config.name, data);
                    }
                }, {
                    key: "getToken",
                    value: function getToken() {
                        return $localForage.getItem(config.name);
                    }
                }, {
                    key: "getTokenType",
                    value: function getTokenType() {
                        return this.getToken().then(function(token) {
                            return token ? token.token_type : undefined;
                        });
                    }
                }, {
                    key: "getAccessToken",
                    value: function getAccessToken() {
                        return this.getToken().then(function(token) {
                            return token ? token.access_token : undefined;
                        });
                    }
                }, {
                    key: "getAuthorizationHeader",
                    value: function getAuthorizationHeader() {
                        var _this = this;
                        var token_type, access_token;
                        return this.getTokenType().then(function(tt) {
                            token_type = tt;
                            return _this.getAccessToken();
                        }).then(function(at) {
                            access_token = at;
                            if (!(token_type && access_token)) {
                                return null;
                            } else {
                                return token_type.charAt(0).toUpperCase() + token_type.substr(1) + " " + access_token;
                            }
                        });
                    }
                }, {
                    key: "getRefreshToken",
                    value: function getRefreshToken() {
                        return this.getToken().then(function(token) {
                            return token ? token.refresh_token : undefined;
                        });
                    }
                }, {
                    key: "removeToken",
                    value: function removeToken() {
                        return $localForage.removeItem(config.name);
                    }
                } ]);
                return OAuthToken;
            }();
            return new OAuthToken();
        };
    }
    return ngModule;
});