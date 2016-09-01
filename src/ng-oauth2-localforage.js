import angular from 'angular';
import OAuthProvider from './providers/oauth-provider';
import OAuthTokenProvider from './providers/oauth-token-provider';
import LocalForageModule from 'angular-localForage';

var ngModule = angular.module('ng-oauth2-localforage', [
    LocalForageModule
  ])
  .provider('OAuth', OAuthProvider)
  .provider('OAuthToken', OAuthTokenProvider);

export default ngModule;
