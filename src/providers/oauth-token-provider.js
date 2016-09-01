import angular from 'angular';

function OAuthTokenProvider() {
  var config = {
    name: 'token'
  };

  this.configure = function(params) {
    // Check if is an `object`.
    if (!(params instanceof Object)) {
      throw new TypeError('Invalid argument: `config` must be an `Object`.');
    }

    // Extend default configuration.
    angular.extend(config, params);

    return config;
  }

  /* OAuthToken Services */

  this.$get = function($localForage) {
    class OAuthToken {
      constructor() {}

      setToken(data) {
        return $localForage.setItem(config.name, data);
      }

      getToken() {
        return $localForage.getItem(config.name);
      }

      getTokenType() {
        return this.getToken()
          .then((token) => {
            return token ? token.token_type : undefined;
          });
      }

      getAccessToken() {
        return this.getToken()
          .then((token) => {
            return token ? token.access_token : undefined;
          });
      }

      getAuthorizationHeader() {
        var token_type, access_token;
        return this.getTokenType()
          .then((tt) => {
            token_type = tt;
            return this.getAccessToken();
          })
          .then((at) => {
            access_token = at;
            if (!(token_type && access_token)) {
              return null;
            } else {
              return `${token_type.charAt(0).toUpperCase() + token_type.substr(1)} ${access_token}`;
            }
          });
      }

      getRefreshToken() {
        return this.getToken()
          .then((token) => {
            return token ? token.refresh_token : undefined;
          });
      }

      removeToken() {
        // return $cookies.remove(config.name, config.options);
        return $localForage.removeItem(config.name);
      }
    }

    return new OAuthToken();
  };

  this.$get.$inject = ['$localForage'];
}

export default OAuthTokenProvider;
