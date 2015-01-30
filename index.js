"use strict";

var pruno = module.parent.require('pruno');
var serverRunner = require('./utils/server-runner');
var path = require('path');

function HttpTask (params) {
  this.params = (params || {});
}

HttpTask.displayName = 'HttpTask';

HttpTask.getDefaults = function() {
  return {
    listen: 3000,
    env: 'development',
    dist: '::dist',
    file: path.join(__dirname, './utils/server.js')
  };
};

HttpTask.prototype.generateWatcher = function(gulp, params) {
  return function() {
    serverRunner.run(params);
    pruno.notify('Simple Server Started!');
    return gulp.watch(params.dist + '/**/*', serverRunner.notify);
  };
};

module.exports = pruno.extend(HttpTask);
