var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap-umd');
var pump = require('pump');
var karma = require('karma')
  .Server;

var config = {
  name: 'ng-oauth2-localforage.js',
  src: ['./src/*.js', './src/**/*.js'],
  dist: './dist',
  umd: {
    namespace: 'ngOAuth2Localforage',
    exports: 'ngModule',
    deps: ['angular', {
      name: 'query-string',
      globalName: 'queryString',
      paramName: 'queryString'
    }, {
      name: 'angular-localforage',
      globalNameString: true,
      globalName: '"LocalForageModule"',
      paramName: 'LocalForageModule'
    }]
  }
};

gulp.task('scripts', [], function(cb) {
  pump([
    gulp.src(config.src),
    babel({
      modules: 'ignore',
      blacklist: ['useStrict']
    }),
    concat(config.name),
    wrap(config.umd),
    uglify({
      mangle: false,
      output: {
        beautify: true
      },
      compress: false
    }),
    gulp.dest(config.dist)
  ], cb);
});

/**
 * Test task.
 */

gulp.task('test', ['scripts'], function() {
  var server = new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(code) {
    console.log('Karma has exited with code', code);
  });

  return server.start();
});

gulp.task('default', ['test']);
