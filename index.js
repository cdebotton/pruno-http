"use strict";

var path = require('path');
var spawn = require('child_process').spawn;
var assign = require('object-assign');
var supervisor = require('supervisor');
var livereload = require('tiny-lr')();

function HttpTask (params) {
  this.params = (params || {});
}

HttpTask.displayName = 'HttpTask';

HttpTask.getDefaults = function() {
  return {
    lrPort: 35729,
    listen: 3000,
    env: 'development',
    dist: '::dist'
  };
};

HttpTask.prototype.generateWatcher = function(gulp, params) {
  return function() {
    var simpleServer = path.join(__dirname, './utils/server.js');
    var server = params.file || simpleServer;

    // livereload.listen(params.lrPort);

    // gulp.watch([params.dist + '/**/*'], function(event) {
    //   var fileName = path.relative(__dirname, event.path);
    //   livereload.changed({body: { files: [fileName] }});
    // });

    process.env.PATH = path.join(
      __dirname, 'node_modules', '.bin'
    ) + ':' + process.env.PATH;

    var env = assign({}, process.env, {
      DIST: params.dist,
      PORT: process.env.PORT || 3000
    });

    var ignore = '--ignore ' + params.dist;

    spawn('supervisor', ['--harmony', ignore, '-e js', server], {
      stdio: 'inherit',
      env: env
    });
  };
};

module.exports = HttpTask;
